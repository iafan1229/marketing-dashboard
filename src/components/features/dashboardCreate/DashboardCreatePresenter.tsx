// 🎪 src/components/features/DashboardCreate/DashboardCreatePresenter.tsx
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

interface DashboardCreatePresenterProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  isLoading: boolean;
  error: string | null;
  handleSubmit: () => void;
}

export function DashboardCreatePresenter({
  title,
  setTitle,
  description,
  setDescription,
  isLoading,
  error,
  handleSubmit,
}: DashboardCreatePresenterProps) {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            새 대시보드 만들기
          </h1>
          <p className='mt-2 text-gray-600'>
            데이터를 시각화할 새로운 대시보드를 생성하세요
          </p>
        </div>

        <Card className='p-8'>
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
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                대시보드 제목 <span className='text-red-500'>*</span>
              </label>
              <Input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='예: 월간 매출 분석 대시보드'
                disabled={isLoading}
                className='w-full'
                required
              />
              <p className='mt-1 text-sm text-gray-500'>
                대시보드의 목적을 명확하게 나타내는 제목을 입력하세요
              </p>
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                설명 (선택사항)
              </label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='이 대시보드에서 어떤 데이터를 분석하고 시각화할지 간단히 설명해주세요...'
                className='w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
                rows={4}
                disabled={isLoading}
              />
              <p className='mt-1 text-sm text-gray-500'>
                팀원들이 이해할 수 있도록 대시보드의 용도와 포함될 내용을
                설명하세요
              </p>
            </div>

            <div className='flex items-center justify-between pt-6 border-t border-gray-200'>
              <Button
                type='button'
                variant='outline'
                onClick={() => window.history.back()}
                disabled={isLoading}
                className='px-6'
              >
                취소
              </Button>

              <Button
                type='submit'
                disabled={isLoading || !title.trim()}
                className='px-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
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
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    생성 중...
                  </div>
                ) : (
                  "대시보드 생성"
                )}
              </Button>
            </div>
          </form>

          <div className='mt-6 p-4 bg-blue-50 rounded-md'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-blue-400'
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
                <p className='text-sm text-blue-700'>
                  <strong>팁:</strong> 대시보드 생성 후 차트, 그래프, 테이블 등
                  다양한 위젯을 추가하여 데이터를 시각화할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
