export const Loading = ({ text }: { text?: string }) => {
  if (text) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-lg text-gray-600'>{text}</div>
      </div>
    );
  } else
    <div className='min-h-screen flex items-center justify-center'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
    </div>;
};
