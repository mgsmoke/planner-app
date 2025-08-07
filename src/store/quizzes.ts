type Quiz = {
  title: string;
  description: string;
  link: string;
};

export const quizzes: Quiz[] = [
  {
    title: 'Тест по планированию',
    description: 'Проверьте свои навыки планирования задач.',
    link: '/quiz/planning',
  },
  {
    title: 'Тест по продуктивности',
    description: 'Как хорошо вы управляете своей продуктивностью?',
    link: '/quiz/productivity',
  },
];
