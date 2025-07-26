import SurveyForm from '@/components/survey-form';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI编程工具使用情况调查
          </h1>
          <p className="text-lg text-gray-600">
            帮助我们了解开发者对AI编程工具的使用情况和看法
          </p>
        </div>
        <SurveyForm />
      </div>
    </div>
  );
}