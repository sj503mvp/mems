const menuArray = [
    {
        name: "首页",
        url: "/Mems/home",
        powerStatus: "",
        routerName: "home",
        openName: "home",
        iconAwesome: "fa fa-bookmark",
        goUrlLocation: false
    },
    {
        name: "设备",
        url: "/Mems/device",
        powerStatus: "",
        routerName: "device",
        iconAwesome: "fa fa-cubes",
        openName: "device",
        menuList: [
            {
                iconAwesome: "fa fa-book",
                name: "pending_device",
                openName: "pending_device",
                title: "待处理设备",
                url: "/Mems/device/pending_device",
                powerStatus: "",
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-cubes",
                name: "all_device",
                openName: "all_device",
                title: "全部设备",
                url: "/Mems/device/all_device",
                powerStatus: "",
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-cube",
                name: "my_device",
                openName: "my_device",
                title: "我的设备",
                url: "/Mems/device/my_device",
                powerStatus: "",
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-recycle",
                name: "recycle_device",
                openName: "recycle_device",
                title: "回收站",
                url: "/Mems/device/recycle_device",
                powerStatus: "",
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-edit",
                lastIconAwesome: "fa fa-plus",
                name: "add_device",
                openName: "add_device",
                powerStatus: "",
                title: "设备录入",
                goUrlLocation: true,
                dropdownList: [
                    {
                        id: 1,
                        title: "冶炼设备",
                        openName: "device_one",
                    },
                    {
                        id: 2,
                        title: "连铸设备",
                        openName: "device_two",
                    },
                    {
                        id: 3,
                        title: "轧制设备",
                        openName: "device_three",
                    },
                    {
                        id: 4,
                        title: "后步精整设备",
                        openName: "device_four",
                    },
                    {
                        id: 5,
                        title: "辅助设备",
                        openName: "device_five",
                    },
                ],
                children: []
            },
        ]
    },
    {
        name: "通知公告",
        url: "/Mems/notify",
        powerStatus: "",
        routerName: "notify",
        openName: "notify",
        iconAwesome: "fa fa-book",
        menuList: [
            {
                iconAwesome: "fa fa-edit",
                name: "notify_add",
                openName: "notify_add",
                title: "发布通知",
                goUrlLocation: false,
                powerStatus: "",
                url: "/Mems/notify/notify_add"
            },
            {
                iconAwesome: "fa fa fa-gavel",
                name: "notify_approval",
                openName: "notify_approval",
                title: "审批通知",
                goUrlLocation: false,
                powerStatus: "hasNotifyApproval",
                url: "/Mems/notify/notify_approval"
            },
            {
                iconAwesome: "fa fa-sign-in",
                name: "notify_all",
                openName: "notify_all",
                title: "全部通知",
                goUrlLocation: false,
                powerStatus: "",
                url: "/Mems/notify/notify_all"
            },
            {
                iconAwesome: "fa fa-eye-slash",
                name: "notify_unread",
                openName: "notify_unread",
                title: "未查看的通知",
                goUrlLocation: false,
                powerStatus: "",
                url: "/Mems/notify/notify_unread"
            },
        ]
    },
    {
        name: "流程中心",
        url: "/Mems/process/add",
        powerStatus: "",
        routerName: "process",
        openName: "process",
        iconAwesome: "fa fa-calendar-minus-o",
        menuList: [
            {
                iconAwesome: "fa fa-edit",
                name: "process_add",
                openName: "process_add",
                title: "新建流程",
                goUrlLocation: false,
                powerStatus: "",
                url: "/Mems/process/processAdd"
            },
            {
                iconAwesome: "fa fa-paper-plane",
                name: "process_created",
                openName: "process_created",
                title: "我发起的",
                goUrlLocation: false,
                powerStatus: "",
                url: "/Mems/process/processCreated"
            },
            {
                iconAwesome: "fa fa-gavel",
                name: "process_approval",
                openName: "process_approval",
                title: "待我审批",
                goUrlLocation: false,
                powerStatus: "hasProcessApproval",
                url: "/Mems/process/processApproval"
            },
            {
                iconAwesome: "fa fa-edit",
                name: "process_approved",
                openName: "process_approved",
                title: "我已审批",
                goUrlLocation: false,
                powerStatus: "hasProcessApproval",
                url: "/Mems/process/processApproved"
            },
        ]
    },
    {
        name: "权限",
        url: "/Mems/permission",
        powerStatus: "hasChangePermission",
        routerName: "permission",
        openName: "permission",
        iconAwesome: "fa fa-sun-o",
        menuList: [
            {
                iconAwesome: "fa fa-user",
                name: "user",
                openName: "user",
                title: "用户管理",
                children: [],
                goUrlLocation: false,
                powerStatus: "",
                url: "/Mems/permission/user_list"
            },
            {
                iconAwesome: "fa fa-vcard-o",
                name: "manager",
                openName: "manager",
                title: "管理员管理",
                children: [],
                goUrlLocation: false,
                powerStatus: "",
                url: "/Mems/permission/manager_list"
            }
        ]
    },
    {
        name: "问题反馈",
        url: "/Mems/feedback",
        powerStatus: "hasFeedback",
        routerName: "feedback",
        openName: "feedback",
        iconAwesome: "fa fa-bug",
        goUrlLocation: false
    },
    {
        name: "登录日志",
        url: "/Mems/loginRecord",
        powerStatus: "",
        routerName: "loginRecord",
        openName: "loginRecord",
        iconAwesome: "fa fa-yelp",
        goUrlLocation: false
    }
]

export default menuArray
