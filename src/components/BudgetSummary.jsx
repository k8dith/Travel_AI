import React from 'react';
import { DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

export default function BudgetSummary({ budget }) {
  const percentUsed = (budget.spent / budget.total) * 100;
  const remaining = budget.total - budget.spent;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold text-gray-800">Budget Summary</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Total Budget</p>
          <p className="text-3xl font-bold text-gray-800">${budget.total}</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Budget Used</span>
            <span className="text-sm font-semibold text-gray-800">{percentUsed.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                percentUsed > 90 ? 'bg-red-500' : percentUsed > 75 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          {budget.breakdown.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">{item.category}</span>
              <span className="font-semibold text-gray-800">${item.amount}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t-2 border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Total Spent</span>
            <span className="font-bold text-gray-800 text-xl">${budget.spent}</span>
          </div>
          <div className={`flex justify-between items-center ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-semibold">Remaining</span>
            <span className="font-bold text-xl">${remaining}</span>
          </div>
        </div>

        {remaining >= 0 ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">You're within budget! Great planning!</p>
          </div>
        ) : (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">You're ${Math.abs(remaining)} over budget. Consider adjusting your plans.</p>
          </div>
        )}
      </div>
    </div>
  );
}