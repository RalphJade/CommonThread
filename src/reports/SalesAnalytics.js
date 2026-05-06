// ... existing code ...
  renderPredictiveAnalytics() {
    if (this.state.predictiveData) {
      return <Chart type="line" data={this.state.predictiveData} />
    }
    return <div>Loading forecasting data...</div>
  }
// ... existing code ...