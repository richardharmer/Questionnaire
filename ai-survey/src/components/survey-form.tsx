'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  email: string;
  name: string;
  experience: string;
  currentTools: string;
  primaryTool: string;
  satisfaction: string;
  features: string;
  challenges: string;
  recommendation: string;
  futureInterest: string;
  additionalComments: string;
}

export default function SurveyForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    experience: '',
    currentTools: '',
    primaryTool: '',
    satisfaction: '',
    features: '',
    challenges: '',
    recommendation: '',
    futureInterest: '',
    additionalComments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('提交失败，请重试');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">感谢您的参与！</CardTitle>
          <CardDescription>
            您的反馈对我们非常宝贵，我们会认真分析每一份问卷。
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI编程工具使用情况调查</CardTitle>
        <CardDescription>
          我们想了解开发者对AI编程工具的使用情况和看法，您的反馈将帮助我们更好地了解这个领域的发展趋势。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">基本信息</h3>
            
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址 *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">姓名 *</Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="请输入您的姓名"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">编程经验 *</Label>
              <select
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">请选择</option>
                <option value="less-than-1">少于1年</option>
                <option value="1-3">1-3年</option>
                <option value="3-5">3-5年</option>
                <option value="5-10">5-10年</option>
                <option value="more-than-10">10年以上</option>
              </select>
            </div>
          </div>

          {/* AI工具使用情况 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI编程工具使用情况</h3>
            
            <div className="space-y-2">
              <Label htmlFor="currentTools">您目前使用过哪些AI编程工具？ *</Label>
              <div className="space-y-2">
                {['GitHub Copilot', 'ChatGPT', 'Claude', 'Cursor', 'Tabnine', 'CodeWhisperer', 'Kite', '其他'].map((tool) => (
                  <label key={tool} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={tool}
                      onChange={(e) => {
                        const tools = formData.currentTools.split(',').filter(t => t.trim());
                        if (e.target.checked) {
                          tools.push(tool);
                        } else {
                          const index = tools.indexOf(tool);
                          if (index > -1) tools.splice(index, 1);
                        }
                        setFormData(prev => ({ ...prev, currentTools: tools.join(',') }));
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{tool}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryTool">您最常用的AI编程工具是什么？ *</Label>
              <select
                id="primaryTool"
                name="primaryTool"
                required
                value={formData.primaryTool}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">请选择</option>
                <option value="github-copilot">GitHub Copilot</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="claude">Claude</option>
                <option value="cursor">Cursor</option>
                <option value="tabnine">Tabnine</option>
                <option value="codewhisperer">CodeWhisperer</option>
                <option value="kite">Kite</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="satisfaction">您对目前使用的AI编程工具的满意度如何？ *</Label>
              <select
                id="satisfaction"
                name="satisfaction"
                required
                value={formData.satisfaction}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">请选择</option>
                <option value="very-satisfied">非常满意</option>
                <option value="satisfied">满意</option>
                <option value="neutral">一般</option>
                <option value="dissatisfied">不满意</option>
                <option value="very-dissatisfied">非常不满意</option>
              </select>
            </div>
          </div>

          {/* 详细反馈 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">详细反馈</h3>
            
            <div className="space-y-2">
              <Label htmlFor="features">您最喜欢AI编程工具的哪些功能？ *</Label>
              <Textarea
                id="features"
                name="features"
                required
                value={formData.features}
                onChange={handleInputChange}
                placeholder="例如：代码自动补全、错误检测、代码解释等"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">使用AI编程工具时遇到的主要挑战是什么？ *</Label>
              <Textarea
                id="challenges"
                name="challenges"
                required
                value={formData.challenges}
                onChange={handleInputChange}
                placeholder="例如：准确性问题、学习成本、集成困难等"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recommendation">您会向其他开发者推荐AI编程工具吗？ *</Label>
              <select
                id="recommendation"
                name="recommendation"
                required
                value={formData.recommendation}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">请选择</option>
                <option value="definitely">绝对会推荐</option>
                <option value="probably">可能会推荐</option>
                <option value="neutral">中性</option>
                <option value="probably-not">可能不会推荐</option>
                <option value="definitely-not">绝对不会推荐</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="futureInterest">您对AI编程工具未来发展的哪个方向最感兴趣？ *</Label>
              <select
                id="futureInterest"
                name="futureInterest"
                required
                value={formData.futureInterest}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">请选择</option>
                <option value="better-accuracy">更高的准确性</option>
                <option value="more-languages">支持更多编程语言</option>
                <option value="better-integration">更好的IDE集成</option>
                <option value="code-review">自动代码审查</option>
                <option value="documentation">自动文档生成</option>
                <option value="testing">自动测试生成</option>
                <option value="debugging">智能调试助手</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalComments">其他意见或建议</Label>
              <Textarea
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                placeholder="请分享您的其他想法或建议"
                rows={4}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? '提交中...' : '提交问卷'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}