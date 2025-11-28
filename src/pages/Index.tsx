import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  name: string;
  client: string;
  budget: number;
  spent: number;
  stage: string;
  progress: number;
  color: string;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface ContentTask {
  id: number;
  date: Date;
  platform: string;
  content: string;
  status: 'planned' | 'in-progress' | 'done';
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  active: boolean;
}

const mockProjects: Project[] = [
  { id: 1, name: 'Запуск Instagram', client: 'Beauty Salon', budget: 150000, spent: 87000, stage: 'Контент-план', progress: 65, color: 'from-purple-500 to-pink-500' },
  { id: 2, name: 'VK Реклама', client: 'Fitness Club', budget: 200000, spent: 45000, stage: 'Таргетинг', progress: 30, color: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'YouTube Канал', client: 'Tech Startup', budget: 300000, spent: 180000, stage: 'Съёмка', progress: 80, color: 'from-orange-500 to-red-500' },
];

export default function Index() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Подготовить креативы для сторис', completed: false, priority: 'high' },
    { id: 2, text: 'Согласовать контент-план с клиентом', completed: true, priority: 'medium' },
    { id: 3, text: 'Настроить аналитику', completed: false, priority: 'low' },
  ]);
  const [contentTasks, setContentTasks] = useState<ContentTask[]>([
    { id: 1, date: new Date(), platform: 'Instagram', content: 'Пост про акцию', status: 'planned' },
    { id: 2, date: new Date(), platform: 'VK', content: 'Сторис с отзывом', status: 'done' },
  ]);
  const [teamMembers] = useState<TeamMember[]>([
    { id: 1, name: 'Анна Смирнова', role: 'SMM-менеджер', active: true },
    { id: 2, name: 'Иван Петров', role: 'Дизайнер', active: true },
    { id: 3, name: 'Мария Козлова', role: 'Копирайтер', active: false },
  ]);

  if (!selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Мои Проекты
            </h1>
            <p className="text-gray-600 text-lg">Управляй проектами эффективно</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project, index) => (
              <Card
                key={project.id}
                className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:scale-105 animate-scale-in bg-white/80 backdrop-blur"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className={`h-2 w-full bg-gradient-to-r ${project.color} rounded-full mb-4`} />
                
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{project.name}</h3>
                <p className="text-gray-500 mb-4 flex items-center gap-2">
                  <Icon name="Building2" size={16} />
                  {project.client}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Прогресс</span>
                    <span className="text-sm font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Потрачено</p>
                      <p className="text-lg font-bold text-gray-900">{project.spent.toLocaleString()} ₽</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Бюджет</p>
                      <p className="text-lg font-bold text-gray-900">{project.budget.toLocaleString()} ₽</p>
                    </div>
                  </div>

                  <Badge className={`bg-gradient-to-r ${project.color} text-white border-0`}>
                    {project.stage}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            Создать проект
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedProject(null)}
              className="hover:bg-purple-100"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
              <p className="text-sm text-gray-500">{selectedProject.client}</p>
            </div>
          </div>
          <Badge className={`bg-gradient-to-r ${selectedProject.color} text-white border-0 text-sm px-4 py-2`}>
            {selectedProject.stage}
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur p-2 shadow-sm">
            <TabsTrigger value="expenses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Wallet" size={18} className="mr-2" />
              Расходы
            </TabsTrigger>
            <TabsTrigger value="stages" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="TrendingUp" size={18} className="mr-2" />
              Стадии
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="CheckSquare" size={18} className="mr-2" />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Calendar" size={18} className="mr-2" />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Users" size={18} className="mr-2" />
              Команда
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                <Icon name="DollarSign" size={32} className="mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Бюджет проекта</p>
                <p className="text-3xl font-bold">{selectedProject.budget.toLocaleString()} ₽</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
                <Icon name="TrendingDown" size={32} className="mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Потрачено</p>
                <p className="text-3xl font-bold">{selectedProject.spent.toLocaleString()} ₽</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
                <Icon name="PiggyBank" size={32} className="mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Остаток</p>
                <p className="text-3xl font-bold">{(selectedProject.budget - selectedProject.spent).toLocaleString()} ₽</p>
              </Card>
            </div>

            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Использование бюджета</h3>
              <Progress value={(selectedProject.spent / selectedProject.budget) * 100} className="h-4 mb-2" />
              <p className="text-sm text-gray-600">
                {((selectedProject.spent / selectedProject.budget) * 100).toFixed(1)}% от бюджета использовано
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Последние транзакции</h3>
              <div className="space-y-3">
                {[
                  { name: 'Таргетированная реклама', amount: 25000, date: '25 ноя' },
                  { name: 'Дизайн креативов', amount: 15000, date: '23 ноя' },
                  { name: 'Копирайтинг постов', amount: 8000, date: '20 ноя' },
                ].map((transaction, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-purple-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <p className="font-bold text-gray-900">-{transaction.amount.toLocaleString()} ₽</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stages" className="animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Воронка проекта</h3>
              <div className="space-y-4">
                {[
                  { name: 'Бриф и анализ', status: 'completed', progress: 100 },
                  { name: 'Стратегия и план', status: 'completed', progress: 100 },
                  { name: 'Контент-план', status: 'current', progress: 65 },
                  { name: 'Запуск рекламы', status: 'upcoming', progress: 0 },
                  { name: 'Аналитика и отчёт', status: 'upcoming', progress: 0 },
                ].map((stage, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {stage.status === 'completed' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                            <Icon name="Check" size={18} className="text-white" />
                          </div>
                        )}
                        {stage.status === 'current' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                            <Icon name="Loader" size={18} className="text-white" />
                          </div>
                        )}
                        {stage.status === 'upcoming' && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Icon name="Circle" size={18} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className={`font-semibold ${stage.status === 'current' ? 'text-purple-600' : 'text-gray-900'}`}>
                            {stage.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{stage.progress}%</span>
                    </div>
                    <Progress value={stage.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Список задач</h3>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-4 rounded-lg transition-all hover:shadow-md ${
                      task.completed ? 'bg-gray-50' : 'bg-white border-2 border-gray-100'
                    }`}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={(checked) => {
                        setTasks(tasks.map((t) =>
                          t.id === task.id ? { ...t, completed: checked as boolean } : t
                        ));
                      }}
                      className="border-2"
                    />
                    <p className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 font-medium'}`}>
                      {task.text}
                    </p>
                    <Badge
                      className={`${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          : 'bg-green-100 text-green-700 border-green-200'
                      }`}
                    >
                      {task.priority === 'high' ? 'Срочно' : task.priority === 'medium' ? 'Средне' : 'Низко'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Календарь публикаций</h3>
                <Calendar mode="single" className="rounded-md" />
              </Card>
              <Card className="p-6 bg-white/80 backdrop-blur shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Контент-план</h3>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </div>
                <div className="space-y-3">
                  {contentTasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-lg border-2 border-gray-100 bg-white hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                          {task.platform}
                        </Badge>
                        <Badge
                          className={`${
                            task.status === 'done'
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : task.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          {task.status === 'done' ? 'Готово' : task.status === 'in-progress' ? 'В работе' : 'Запланировано'}
                        </Badge>
                      </div>
                      <p className="text-gray-900 font-medium mb-2">{task.content}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        {task.date.toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Команда проекта</h3>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Пригласить
                </Button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-100 bg-white hover:shadow-md transition-all">
                    <Avatar className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400">
                      <AvatarFallback className="text-white font-bold">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                    <Badge className={member.active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}>
                      {member.active ? 'Активен' : 'Не в сети'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
