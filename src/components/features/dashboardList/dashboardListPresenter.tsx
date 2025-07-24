import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dashboard } from "@/types/api";
import { useRouter } from "next/navigation";

interface DashboardListPresenterProps {
  dashboards: Dashboard[];
  isLoading: boolean;
  error: string | null;
}

export function DashboardListPresenter({
  dashboards,
  isLoading,
  error,
}: DashboardListPresenterProps) {
  const router = useRouter();

  if (isLoading) {
    return <div className='text-center py-8'>로딩 중...</div>;
  }

  if (error) {
    return <div className='text-center py-8 text-red-600'>오류: {error}</div>;
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard List</h1>
        <Button
          onClick={() => router.push("/dashboard/create")}
          className='bg-blue-600 hover:bg-blue-700'
        >
          + Create New Dashboard
        </Button>
      </div>

      {dashboards.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 mb-4'>아직 대시보드가 없습니다.</p>
          <Button
            onClick={() => router.push("/dashboard/create")}
            className='bg-blue-600 hover:bg-blue-700'
          >
            Create First Dashboard
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {dashboards.map((dashboard) => (
            <Card
              key={dashboard.id}
              className='p-6 hover:shadow-lg transition-shadow'
            >
              {/* title → name으로 변경 */}
              <h3 className='text-xl font-semibold mb-2'>{dashboard.name}</h3>

              {/* description이 없으므로 제거하거나 조건부 렌더링 */}
              {/* {dashboard.description && (
                <p className='text-gray-600 mb-4'>{dashboard.description}</p>
              )} */}

              {/* user 정보가 없으므로 차트 개수로 대체 */}
              <div className='flex items-center space-x-2 mb-4 text-sm text-gray-500'>
                <span>{dashboard.charts.length}개의 차트</span>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-400'>
                  {new Date(dashboard.createdAt).toLocaleDateString("ko-KR")}
                </span>
                <Button
                  onClick={() => router.push(`/dashboard/${dashboard.id}`)}
                  variant='outline'
                  size='sm'
                >
                  열기
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
