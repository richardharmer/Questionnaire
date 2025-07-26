import { db, surveys } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminPage() {
  let surveyData: typeof surveys.$inferSelect[] = [];
  let error = null;

  try {
    surveyData = await db.select().from(surveys).orderBy(surveys.createdAt);
  } catch (e) {
    error = '无法连接到数据库，请检查数据库配置';
    console.error('Database error:', e);
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">数据库连接错误</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            问卷调查结果管理
          </h1>
          <p className="text-lg text-gray-600">
            共收到 {surveyData.length} 份问卷回复
          </p>
        </div>

        <div className="grid gap-6">
          {surveyData.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>暂无数据</CardTitle>
                <CardDescription>还没有收到任何问卷回复</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            surveyData.map((survey, index) => (
              <Card key={survey.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>回复 #{index + 1}</span>
                    <span className="text-sm font-normal text-gray-500">
                      {survey.createdAt ? new Date(survey.createdAt).toLocaleString('zh-CN') : '未知时间'}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {survey.name} ({survey.email})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>编程经验:</strong> {survey.experience}
                    </div>
                    <div>
                      <strong>使用过的工具:</strong> {survey.currentTools}
                    </div>
                    <div>
                      <strong>主要工具:</strong> {survey.primaryTool}
                    </div>
                    <div>
                      <strong>满意度:</strong> {survey.satisfaction}
                    </div>
                    <div>
                      <strong>推荐意愿:</strong> {survey.recommendation}
                    </div>
                    <div>
                      <strong>未来兴趣:</strong> {survey.futureInterest}
                    </div>
                    <div className="md:col-span-2">
                      <strong>喜欢的功能:</strong> {survey.features}
                    </div>
                    <div className="md:col-span-2">
                      <strong>遇到的挑战:</strong> {survey.challenges}
                    </div>
                    {survey.additionalComments && (
                      <div className="md:col-span-2">
                        <strong>其他意见:</strong> {survey.additionalComments}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}