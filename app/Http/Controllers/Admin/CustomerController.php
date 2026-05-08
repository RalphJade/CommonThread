<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display the list of clients/customers.
     */
    public function index(Request $request)
    {
        $query = User::query()
            ->where('is_admin', false) // Exclude admins from the client list
            ->withCount('orders')
            ->withSum('orders', 'total');

        // Search Filter (matches your frontend Search input)
        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // Status Filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        return Inertia::render('admin/customers/index', [
            'clients' => $query->latest()->paginate(10)->withQueryString()->through(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? 'N/A',
                'status' => $user->status ?? 'active', // active, lead, inactive
                'last_order_date' => $user->orders()->latest()->first()?->created_at->format('Y-m-d'),
                'total_spend' => $user->orders_sum_total ?? 0,
            ]),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Display a specific client's profile and history.
     */
    public function show(User $customer)
    {
        return Inertia::render('admin/customers/show', [
            'client' => $customer->load(['orders' => function($q) {
                $q->latest()->limit(10);
            }]),
            'metrics' => [
                'total_orders' => $customer->orders()->count(),
                'total_spend' => $customer->orders()->sum('total'),
            ]
        ]);
    }

    /**
     * Update the client's status (active/lead/inactive).
     */
    public function updateStatus(Request $request, User $customer)
    {
        $request->validate([
            'status' => 'required|in:active,lead,inactive',
        ]);

        $customer->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Client status updated successfully.');
    }
}