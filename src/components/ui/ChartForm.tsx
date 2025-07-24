import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/ui/Header";
import { Select } from "@/components/ui/Select";
import {
  CHART_TYPE_OPTIONS,
  ChartFormData,
  ChartFormProps,
  MOCK_API_OPTIONS,
} from "@/types/app/chart";

export const ChartForm: React.FC<ChartFormProps> = ({
  chart,
  onChange,
  onDelete,
  index,
}) => {
  const handleFieldChange = (
    field: keyof ChartFormData,
    value: string | number
  ) => {
    onChange(index, { ...chart, [field]: value });
  };

  const selectedApi = MOCK_API_OPTIONS.find(
    (api) => api.value === chart.dataEndpoint
  );

  return (
    <Card className='p-6 border-l-4 border-l-brand-mint'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>
          Chart #{index + 1}
        </h3>
        {index > 0 && (
          <Button
            variant='ghost'
            onClick={() => onDelete(index)}
            className='text-red-600 hover:text-red-800 hover:bg-red-50'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
            Delete
          </Button>
        )}
      </div>

      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Chart Title <span className='text-red-500'>*</span>
          </label>
          <Input
            type='text'
            value={chart.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder='For example: Signups by Region'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Chart Type <span className='text-red-500'>*</span>
          </label>
          <Select
            options={CHART_TYPE_OPTIONS}
            value={chart.type}
            onChange={(value) => handleFieldChange("type", value)}
            placeholder='Select chart type'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Data Source <span className='text-red-500'>*</span>
          </label>
          <Select
            options={MOCK_API_OPTIONS.map((api) => ({
              value: api.value,
              label: api.label,
            }))}
            value={chart.dataEndpoint}
            onChange={(value) => handleFieldChange("dataEndpoint", value)}
            placeholder='Select a mock API'
          />
          {selectedApi && (
            <p className='mt-1 text-sm text-gray-500'>
              {selectedApi.description} • Recommended type: {selectedApi.type}
            </p>
          )}
        </div>

        {/* Chart Preview Info */}
        {chart.title && chart.type && chart.dataEndpoint && (
          <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-md'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-green-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-green-700'>
                  <strong>미리보기:</strong> {chart.title} ({chart.type} 차트)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
