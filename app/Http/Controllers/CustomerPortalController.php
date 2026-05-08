<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller; // Inherits from the base class

class CustomerPortalController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        // Check if the user is an admin
        if ($user && $user->isAdmin()) { 
            return Inertia::render('admin/enhanced-dashboard'); 
        }

        // Default: Return the Customer Portal for regular clients
        return Inertia::render('customers'); 
    }
}