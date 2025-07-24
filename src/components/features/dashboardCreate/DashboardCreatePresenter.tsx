"use client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
import { ChartFormData, DashboardCreateProps } from "@/types/app/chart";
import { useRouter } from "next/navigation";
import { ChartForm } from "../chartForm/ChartForm";

export const DashboardCreatePresenter: React.FC<DashboardCreateProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  charts,
  setCharts,
  isLoading,
  error,
  handleSubmit,
}) => {
  const router = useRouter();

  const addChart = (): void => {
    setCharts([
      ...charts,
      {
        title: "",
        type: "",
        dataEndpoint: "",
        order: charts.length,
      },
    ]);
  };

  const updateChart = (index: number, updatedChart: ChartFormData): void => {
    const newCharts = [...charts];
    newCharts[index] = updatedChart;
    setCharts(newCharts);
  };

  const deleteChart = (index: number): void => {
    if (charts.length > 1) {
      const newCharts = charts.filter((_, i) => i !== index);
      const reorderedCharts = newCharts.map((chart, i) => ({
        ...chart,
        order: i,
      }));
      setCharts(reorderedCharts);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <div className='py-12'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Create New Dashboard
            </h1>
            <p className='mt-2 text-gray-600'>
              Enter dashboard information and configure charts.
            </p>
          </div>

          {error && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-md'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-red-700'>{error}</p>
                </div>
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className='space-y-8'
          >
            {/* Dashboard Info Section */}
            <Card className='p-8'>
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>
                Dashboard Information
              </h2>

              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Dashboard Title <span className='text-red-500'>*</span>
                  </label>
                  <Input
                    id='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='For example: Monthly Sales Analysis Dashboard'
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Description (optional)
                  </label>
                  <textarea
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Enter a description of the dashboard...'
                    className='w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </Card>

            {/* Charts Section */}
            <div>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-gray-900'>Charts</h2>
                <Button
                  type='button'
                  variant='outline'
                  onClick={addChart}
                  disabled={isLoading}
                  className='flex items-center'
                >
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                  Add Chart
                </Button>
              </div>

              <div className='space-y-6'>
                {charts.map((chart, index) => (
                  <ChartForm
                    key={index}
                    chart={chart}
                    onChange={updateChart}
                    onDelete={deleteChart}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-between pt-6 border-t border-gray-200'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                type='submit'
                disabled={isLoading || !title.trim()}
                className='bg-brand-purple hover:bg-brand-purple/90 disabled:opacity-50'
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Creating...
                  </div>
                ) : (
                  `대시보드 생성 (${charts.length}개 차트)`
                )}
              </Button>
            </div>
          </form>

          {/* Tips Section */}
          <Card className='mt-8 p-6 bg-brand-mint/10 border-brand-mint/30'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-brand-purple'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-brand-purple'>Tips</h3>
                <div className='mt-2 text-sm text-gray-700'>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>
                      <strong>Data Source:</strong> Select data source
                    </li>
                    <li>
                      <strong>Chart Type:</strong> Can visualize same data in
                      Bar, Line, Number
                    </li>
                    <li>
                      <strong>Recommendation:</strong> Refer to yellow box
                      recommendation, but you can change it as you like
                    </li>
                    <li>
                      <strong>Experiment:</strong> Try different types to see
                      which one best represents the data
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
