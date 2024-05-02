import cookie from "js-cookie";

const menuArray = [
    {
        name: "首页",
        url: "/Mems/home",
        routerName: "home",
        openName: "home",
        iconAwesome: "fa fa-bookmark",
        goUrlLocation: false
    },
    {
        name: "设备",
        url: "/Mems/device",
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
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-cubes",
                name: "all_device",
                openName: "all_device",
                title: "全部设备",
                url: "/Mems/device/all_device",
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-cube",
                name: "my_device",
                openName: "my_device",
                title: "我的设备",
                url: "/Mems/device/my_device",
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-recycle",
                name: "recycle_device",
                openName: "recycle_device",
                title: "回收站",
                url: "/Mems/device/recycle_device",
                goUrlLocation: false,
                children: []
            },
            {
                iconAwesome: "fa fa-edit",
                lastIconAwesome: "fa fa-plus",
                name: "add_device",
                openName: "add_device",
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
            {
                iconAwesome: "fa fa-bar-chart",
                name: "report_device",
                openName: "report_device",
                title: "设备报表",
                url: "/Mems/device/device_chart",
                goUrlLocation: false,
                children: []
            }
        ]
    },
    {
        name: "日程管理",
        url: "/Mems/schedule",
        routerName: "schedule",
        openName: "schedule",
        goUrlLocation: false,
        iconAwesome: "fa fa-calendar-o"
    },
    {
        name: "通知公告",
        url: "/Mems/notify/index.html",
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
                url: "/Mems/office/Notify/index.html"
            },
            {
                iconAwesome: "fa fa fa-gavel",
                name: "notify_approval",
                openName: "notify_approval",
                title: "审批通知",
                goUrlLocation: false,
                url: "/Mems/office/Notify/notifyList/list/approval"
            },
            {
                iconAwesome: "fa fa-check",
                name: "notify_my",
                openName: "notify_my",
                title: "我发布的通知",
                goUrlLocation: false,
                url: "/Mems/office/Notify/notifyList/list/my"
            },
            {
                iconAwesome: "fa fa-sign-in",
                name: "notify_all",
                openName: "notify_all",
                title: "全部通知",
                goUrlLocation: false,
                url: "/Mems/office/Notify/notifyList/list/all"
            },
            {
                iconAwesome: "fa fa-eye-slash",
                name: "notify_unread",
                openName: "notify_unread",
                title: "未查看的通知",
                goUrlLocation: false,
                url: "/Mems/office/Notify/notifyList/list/unread"
            },
            {
                iconAwesome: "fa fa-trash-o",
                name: "notify_delete",
                openName: "notify_delete",
                title: "回收站",
                goUrlLocation: false,
                url: "/Mems/office/Notify/notifyList/list/del"
            }
        ]
    },
    {
        name: "流程中心",
        url: "/Mems/process/add",
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
                url: "/Mems/process/add"
            },
            {
                iconAwesome: "fa fa-paper-plane",
                name: "process_my_launch",
                openName: "process_my_launch",
                title: "我发起的",
                goUrlLocation: false,
                url: "/Mems/process/created"
            },
            {
                iconAwesome: "fa fa-gavel",
                name: "process_pending_approval",
                openName: "process_pending_approval",
                title: "待我审批",
                goUrlLocation: false,
                url: "/Mems/process/pendingApproval"
            },
            {
                iconAwesome: "fa fa-edit",
                name: "process_my_approved",
                openName: "process_my_approved",
                title: "我已审批",
                goUrlLocation: false,
                url: "/Mems/process/myApproved"
            },
        ]
    },
    {
        name: "权限",
        url: "/Mems/permission/user_manage",
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
                url: "/Mems/permission/user_list"
            },
            {
                iconAwesome: "fa fa-vcard-o",
                name: "manager",
                openName: "manager",
                title: "管理员管理",
                children: [],
                goUrlLocation: false,
                url: "/Mems/permission/manager_list"
            }
        ]
    }
]

export default menuArray
