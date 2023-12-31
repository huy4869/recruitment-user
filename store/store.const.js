// index
export const INDEX_SET_SUCCESS = 'setNotifySuccess'
export const INDEX_SET_ERROR = 'setNotifyError'
export const INDEX_SET_WARNING = 'setNotifyWarning'
export const INDEX_SET_LOADING = 'setLoading'
export const INDEX_SET_TITLE_MENU = 'setTitleMenu'
export const MASTER_GET_DATA = 'getMasterData'
export const GET_ZIPCODE = 'getZipcode'
export const SET_SHOW_MODAL_SP = 'setShowModalSp'
export const SET_JOB_ERROR = 'setErrorJob'
export const SET_SHOW_MESSAGE_SP = 'setShowMessageSP'
export const GET_COUNT_CHAT = 'getCountChat'

// user
export const USER_UPDATE_PROFILE = 'user/updateProfile'
export const USER_FORGOT_PASS = 'authentication/forgotPass'
export const AUTH_CHECK_TOKEN = 'authentication/checkToken'
export const AUTH_RESET_PASS = 'authentication/resetPass'

// authentication
export const AUTH_REGISTER = 'authentication/register'
export const CHANGE_PASS = 'authentication/changePassword'
export const AUTH_CHECK_REGISTER = 'authentication/checkRegisterToken'

// chat
export const CHAT_FETCH_MESSAGE = 'chat/fetchMessage'
export const CHAT_SEND_MESSAGE = 'chat/sendMessage'
export const CHAT_FETCH_ROOMS = 'chat/fetchRooms'
export const CHAT_FETCH_UN_READ_MESSAGE = 'chat/fetchUnreadMessage'
export const CHAT_SET_CHAT_WITH_SHOP = 'chat/setChatWithShop'
export const CHAT_SET_SWITCH_CHAT = 'chat/setSwitchChat'
export const CHAT_SET_UN_READ_MESSAGE = 'chat/setUnreadMessage'

// my_page
export const MY_PAGE_SET_STATE_PAGE = 'my_page/setStatePage'
export const MY_PAGE_SET_SHOW_DETAIL_MESSAGE = 'my_page/setShowDetailMessage'
export const MY_PAGE_GET_PERCENTAGE = 'my_page/getPercentage'

export const USER_BASIC_INFO = 'my_page/getBasicInfo'
export const USER_UPDATE_BASIC_INFO = 'my_page/updateBasicInfo'
export const USER_UPLOAD_AVATAR = 'my_page/uploadAvatar'
export const WORK_HISTORY_LIST = 'my_page/getListWorkHistory'
export const WORK_HISTORY_DETAIL = 'my_page/getWorkHistoryByID'
export const WORK_HISTORY_UPDATE = 'my_page/updateWorkHistory'
export const WORK_HISTORY_CREATE = 'my_page/createWorkHistory'
export const WORK_HISTORY_DELETE = 'my_page/deleteWorkHistory'
export const USER_SELF_PR = 'my_page/getSelfPr'
export const USER_SELF_PR_UPDATE = 'my_page/updateSelfPr'
export const WORK_QUALIFICATION_LIST = 'my_page/getListQualification'
export const WORK_QUALIFICATION_DETAIL = 'my_page/getQualificationByID'
export const WORK_QUALIFICATION_UPDATE = 'my_page/updateQualification'
export const WORK_QUALIFICATION_CREATE = 'my_page/createQualification'
export const WORK_QUALIFICATION_DELETE = 'my_page/deleteQualification'
export const EDU_LIST = 'my_page/getListEdu'
export const EDU_DETAIL = 'my_page/getEduByID'
export const EDU_UPDATE = 'my_page/updateEdu'
export const EDU_CREATE = 'my_page/createEdu'
export const EDU_DELETE = 'my_page/deleteEdu'
export const MOTIVATION_USER = 'my_page/getMotivation'
export const MOTIVATION_UPDATE = 'my_page/updateMotivation'
export const DESIRED_DETAIL = 'my_page/getDesired'
export const DESIRED_UPDATE = 'my_page/updateDesired'

// Inquiry
export const INQUIRY_CREATE = 'my_page/createInquiry'
export const INQUIRY_PHONE_NUMBER = 'my_page/getPhoneNumber'

// application
export const APPLICATION_LIST = 'application/getListApplication'
export const APPLICATION_LIST_APPLIED = 'application/getListApplicationApplied'
export const APPLICATION_LIST_WAITING_INTERVIEW = 'application/getListApplicationWaitingInterview'
export const APPLICATION_CANCEL_APPLICATION = 'application/postCancelApplication'
export const APPLICATION_GET_DATA_APPLICATION = 'application/getDataApplication'
export const APPLICATION_GET_DATA_DETAIL_APPLICATION = 'application/getDataDetailApplication'
export const APPLICATION_CREATE_APPLICATION = 'application/postCreateApplication'
export const APPLICATION_UPDATE_APPLICATION = 'application/postUpdateApplication'

// chat
export const CHAT_LIST = 'chat/listChat'
export const CHAT_DETAIL_CHAT = 'chat/getDetailChat'
export const CHAT_CREATE_MESSAGE = 'chat/createMessage'

// job
export const JOB_LIST_JOBS = 'job/listJob'
export const JOB_LIST_FAVORITE = 'job/listFavorite'
export const JOB_LIST_NEW_JOBS = 'job/listNewJobs'
export const JOB_LIST_MOST_VIEW_JOBS = 'job/listMostViewJobs'
export const JOB_LIST_RECOMMEND_JOBS = 'job/listRecommendJobs'
export const JOB_LIST_RECENT_JOBS = 'job/listRecentJobs'
export const JOB_LIST_SUGGEST_JOBS = 'job/listSuggestJobs'
export const JOB_GET_DETAIL_JOB = 'job/getDetailJob'
export const JOB_REMOVE_FAVORITE_JOB = 'job/removeFavoriteJob'
export const JOB_ADD_FAVORITE_JOB = 'job/addFavoriteJob'
export const JOB_LIST_SEARCH_JOB = 'job/listSearchJob'
export const JOB_REMOVE_SEARCH_JOB = 'job/removeSearchJob'
export const JOB_CREATE_FEEDBACK = 'job/createFeedback'
export const JOB_GET_TOTAL_JOB = 'job/getTotalJob'
export const JOB_TYPE_AMOUNT = 'job/getJobTypeAmount'

// notification
export const NOTIFICATION_LIST = 'notification/listNotification'
export const NOTIFICATION_UPDATE_READ = 'notification/readNotification'
export const NOTIFICATION_COUNT = 'notification/countNotification'

// location
export const LOCATION_LIST_MOST_APPLY = 'location/listLocationMostApply'
export const LOCATION_LIST_AMOUNT = 'location/listLocationAmount'
