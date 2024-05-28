const home = {
    path: 'feedback',
    name: '问题反馈',
    meta: {
        title: '问题反馈',
        openName: "feedback",
    },
    component: () => import('@/pages/feedback/Feedback.vue'),
}

export default home;
