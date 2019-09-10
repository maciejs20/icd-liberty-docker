/* @license
 * Licensed Materials - Property of IBM
 *
 * (C) COPYRIGHT IBM CORP. 2014, 2016
 *
 * All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

var config = {};

//SCCD configuration

//DO NOT change the default config.sccd_url value in Git!
//It will break all the automation code!
//You should only set this value locally, or update your SCCD_URL environment variable
config.sccd_url = 'http://maximo-api:9080';
//the following attribute represent the real location of the node js server for service portal
config.sp_full_url = process.env.SP_URL;

config.sccd_port = 3000;
config.sccd_rest_contextroot = process.env.SCCD_REST_CONTEXTROOT || 'maxrest';
config.sccd_contextroot = process.env.SCCD_CONTEXTROOT || 'maximo';

config.sccd_personobj = process.env.SCCD_USEROBJ || 'CDUIUSER';
config.sccd_personobjget = process.env.SCCD_GETUSEROBJ || 'CDUIGETUSER';
config.sccd_persongroupobjget = process.env.SCCD_PERSONGROUPOBJ || 'CDUIGETPERSONGROUP';
config.sccd_persongroupmemberobjget = process.env.SCCD_PERSONGROUPMEMBEROBJ || 'CDUIGETGROUPMEMBERS';
config.sccd_syspropobjget = process.env.SCCD_SYSPROPOBJ || 'CDUIGETSYSPROP';
config.sccd_ticketobj = process.env.SCCD_INCIDENTOBJ || 'CDUIINCIDENT';
config.sccd_scticketobj = process.env.SCCD_SCINCIDENTOBJ || 'CDUIMYINCIDENT';
config.sccd_ticketobj_t = process.env.SCCD_TICKETOBJ || 'CDUITICKET';
config.sccd_scticketobj_t = process.env.SCCD_SCTICKETOBJ || 'CDUIMYTICKET';
config.sccd_ticketobj_p = process.env.SCCD_TICKETOBJ || 'CDUIPROBLEM';
config.sccd_scticketobj_p = process.env.SCCD_SCTICKETOBJ || 'CDUIMYPROBLEM';
config.sccd_ticketobj_s = process.env.SCCD_SCSROBJ || 'CDUISR';
config.sccd_scticketobj_s = process.env.SCCD_SCSROBJ || 'CDUIMYSR';
config.sccd_syndomobj = process.env.SCCD_SYNDOMOBJ || 'CDUISYNDOMAIN';
config.sccd_numdomobj = process.env.SCCD_NUMDOMOBJ || 'CDUINUMDOMAIN';
config.sccd_alndomobj = process.env.SCCD_ALNDOMOBJ || 'CDUIALNDOMAIN';
config.sccd_worklogobj = process.env.SCCD_WORKLOGOBJ || 'CDUIWORKLOG';
config.sccd_scworklogobj = process.env.SCCD_SCWORKLOGOBJ || 'CDUIMYWORKLOG';
config.sccd_groupobj = process.env.SCCD_GROUPOBJ || 'CDUIGROUP';
config.sccd_siteobj = process.env.SCCD_SITEOBJ || 'CDUISITE';
config.sccd_resetpsw = process.env.SCCD_RESETPSWOBJ || 'CDUIRESETPSW';
config.sccd_activitylogobj = process.env.SCCD_ACTIVITYLOGOBJ || 'CDUIINCIDENTLOG';
config.sccd_solcommentsobj = process.env.SCCD_SOLCOMMENTSOBJ || 'CDUISRMSOLCOMMENTS';
config.sccd_catofferings = process.env.SCCD_CATOFFOBJ || 'CDUIOFF';
config.sccd_catofferingslist = process.env.SCCD_CATOFFLISTOBJ || 'CDUIOFFLIST';
config.sccd_catimg = process.env.SCCD_CATIMGOBJ || 'CDUIIMG';
config.sccd_searchoffobj = process.env.SCCD_SEARCHOFFOBJ || 'CDUISRMOFFERING';
config.sccd_searchsolobj = process.env.SCCD_SEARCHSOLOBJ || 'CDUISRMSOLUTION';
config.sccd_searchbulobj = process.env.SCCD_SEARCHBULOBJ || 'CDUISRMBULLETIN';
config.sccd_searchincobj = process.env.SCCD_SEARCHINCOBJ || 'CDUISRMINCIDENT';
config.sccd_attachobj = process.env.SCCD_ATTACHOBJ || 'CDUIATTACH';
config.sccd_attachinfoobj = process.env.SCCD_ATTACHINFOOBJ || 'CDUIDOCINFO';
config.sccd_asset = process.env.SCCD_CDUIASSETOBJ || 'CDUIASSET';
config.sccd_favoriteitem = process.env.SCCD_FAVORITEITEMOBJ || 'CDUIFAVITEM';
config.sccd_tktemplateobj = process.env.SCCD_TKTEMPLATEOBJ || 'CDUITKTEMPLATE';
config.sccd_offcommentsobj = process.env.SCCD_OFFCOMMENTSOBJ || 'CDUISRMOFFCOMMENTS';
config.sccd_maxattribute = process.env.SCCD_MAXATTRIBUTE || 'CDUIMAXATTRIBUTE';
config.sccd_bookmarkobj = process.env.SCCD_BOOKMARKOBJ || 'CDUIBOOKMARK';
config.sccd_commtemplate = process.env.SCCD_COMMTEMPLATE || 'CDUICOMMTEMPLATE';
config.sccd_commlog = process.env.SCCD_COMMLOG || 'CDUICOMMLOG';
config.sccd_impacturgencymatrix= process.env.SCCD_CDUIPRIORITYMATRIX || 'CDUIPRIORITYMATRIX';
config.sccd_sla= process.env.SCCD_CDUISLA || 'CDUISLA';
config.sccd_wochange= process.env.SCCD_CDUIWOCHANGE || 'CDUIWOCHANGE';
config.sccd_classstructure = process.env.SCCD_CDUICLASSSTRUCTURE || 'CDUICLASSSTRUCTURE';

config.sccd_domainid_map = {
    "TSDTKTSOURCE": config.sccd_syndomobj,
    "TICKETPRIORITY": config.sccd_numdomobj,
    "SRSTATUS": config.sccd_syndomobj
};

// Some users do not have permissions to get the system properties from CDUIGETSYSPROP
// In this object are stored the default values of some of the system properties that are used
config.sccd_sysprop_defaults = {
    'mxe.doclink.maxfilesize': 30, // in MB
    'mxe.doclink.doctypes.allowedFileExtensions': 'pdf,zip,txt,doc,docx,dwg,gif,jpg,csv,xls,xlsx,ppt,xml,xsl,bmp,html,png,pptx,cfr',
    'mxe.tsd.useprioritymatrix': 1
};

//Cookies configuration
//The names of the cookies we set in the browser and check for in our APIs
config.cookiename_session = 'NGSESSIONID';
config.cookiename_user = 'NGLOGINID';
config.cookiename_ltpa = 'LtpaToken2';
config.cookiename_token = 'NGTOKEN';

//SSL configuration
config.key = 'server.key';
config.cert = 'server.crt';

//Tivoli Directory Server LDAP. This parameter changes the communication in case of TDS LDAP authentication.
// 0 (default) - disabled
// 1  - enabled
config.enable_tds_ldap = 0;

//Enable SAML SSO with Service Portal
config.enable_sso = 0;
config.sp_auth_provider_url = config.sccd_url + "/" + config.sccd_contextroot + "/webclient/serviceportal/spAuthProxy.jsp";
config.sso_logout_page = "";

//Custom Fields to be excluded - an array of custom field names to be excluded from the Service Portal Self Service Center
config.customFieldsExcludedFromReportIssue = [];

// Exclude Specification from Service Portal Ticket detail view
// 0 (default) - specifications are shown
// 1 - specification are hidden
config.specificationsExcludedFromReportIssue = 0;

//Log configuration
config.log_dir = process.env.LOG_DIR || './logs';
config.log_level = process.env.LOG_LEVEL || 'debug';
config.log_filename = process.env.LOG_FILENAME || 'trace.log';
config.log_filesize = process.env.LOG_FILESIZE || 1048576;
config.log_filenum = process.env.LOG_FILENUM || 5;

// parameter that allow to disable csrf security feature
// false: the feature is enabled
// true: the feature is disabled
config.disableCsrf = process.env.DISABLE_CSRF || false;

// This parameter allows you to disable Additional Details Section in Report Issue Section.
// 0 (default) - Type of Issue is enabled
// 1 - Type of Issue field cannot be viewed and will not be used.
config.disableTypeOfIssue = 0;

// Added limit
config.request_limit = "1mb";

//This parameter allows you to disable support for attachments in Service Portal
// 0 (default) - attachments are enabled
// 1 - attachments can not view viewed or added from ticket, solution, etc. screens
config.disableAttachments = 0;
//This parameter allows you to disable the virtual assistant in Service Portal Self Service Center
// 0 (default) - virtual assistant is enabled
// 1 - virtual assistant is disabled and will not appear at all in Service Portal Self Service Center
config.disableVirtualAssistant = 0;
//This parameter allows you to disable the chat feature in Service Portal Self Service Center
// 0 (default) - chat is enabled
// 1 - chat is disabled and will not appear at all in Service Portal Self Service Center
config.disableSelfServiceChat = 0;
//This parameter allows you to select the chatType  feature in Service Portal Self Service Center
// (default)ICD - chat is enabled
// WAG- Watson Chat is enabled and will  appear at all in Service Portal Self Service Center
config.chatType = "ICD";
// This parameter indicated the config values that are required for Watson Virtual Agent Chat Box
config.watsonVirtualAgentConfig = {};

// Turn on/off notification of incoming chat messages
config.chatNotificationSound = false;

//This parameter allows you to disable the catalog tree display feature in Service Portal Self Service Center
// 0 (default) - catalog tree is shown on catalog side
// 1 - catalog tree is disabled
config.disableCatalogTree = 0;

//Request Services parameters
//This parameter indicates the number of days used by the view to search for the previously requested offering. '0' means today.
config.offeringsPrevRequestedDays = 30;
//This parameter indicates the number of days used by the view to search for the recent added offering. '0' means today.
config.offeringsRecentlyAddedDays = 30;
//This parameter indicates the number of days used by the view to search for the frequently used offering. '0' means today.
config.offeringsFreqUsedDays = 30;
//This parameter indicates the number of top offerings requested.
config.topOfferingsFreqUsed = 20;
//Show/Hide the 'Request Update' button on ticket detail page for self-service user
// 0 (default) - 'Request Update' button is displayed
// 1 - 'Request Update' button is disabled and will not appear at all in Service Portal Self Service Center
config.disableRequestedUpdate = 0;

//This parameter specifies the watson domains to be used in Self Service search.
config.wex_domains = [];

//This parameter contains the IBM Watson Explorer dictionaries to be used for the fuzzy search.
config.wex_dictionaries = [];

//This parameter describes the information necessary to group offering tabs
//config.offeringTabs = [];

//This parameter contains the offering attributes already arranged to the default Service Portal layout
config.offeringArrParams = [
    "PMSCOFFERING.description",
    "PMSCOFFERING.itemnum",
    "PMSCOFFERING.thumbnail",
    "PMSCOFFERING.statusdate",
    "PMSCOFFERING.commentcount",
    "PMSCOFFERING.avgranking",
    "PMSCOFFERING.fulfilltime",
    "PMSCOFFERING.attachmentlink",
    "PMSCOFFERING.description_longdescription",
    "PMSCOFFERING.moreinfo_longdescription",
    "PMSCOFFERING.userranking",
    "PMSCOFFERING.addtofav",
    "PMSCOFFERING.deletefav",
    "PMSCOFFERING.rateoffering",
    "SR.pmsconetimeprice",
    "SR.pmsccurrency",
    "SR.pmscrecurringprice"
];

//User roles with access permission to the configuration web application, separated by comma, for example:
// config.configAppUserRoles = "MAXADMIN, SDAADMIN"
config.configAppUserRoles = "MAXADMIN";


// this parameters define a mapping between Service Portal and ICD classic Applications
config.icdAppID = {
    INCIDENT:"INCIDENT",
    SR:"SR",
    PROBLEM:"PROBLEM"
};

//This parameter defines the number of workers of the nodejs application in a cluster
//If this parameter is commented out the number of cores of the system will be used to define the number of workers
//config.workers = 1;

// Enable Watson Service Tile on Service Portal
config.externalServices = [{
    //svg path should be .svg type only.
    // icon should be added in "themes/default/self-service/images/" folder
    // icon added in "themes/default/self-service/images folder" then IconPath start with "images/{iconName}"
    // eg. iconPath: "images/userIcon.svg"
    // if the icon is not placed correctly, default icon will used
    iconPath : "",
    //Tab URL
    url : "",
    //Check Tile is enable or not //Enable =1 //Disable =0
    enable_service : 0,
    //Title
    title:"External Service",
    //Text Message
    subTitle:"Watson Service"
}];

//This parameter allows you to hide communication log for "My Tickets" in service portal self service center
//0 (default)- communication logs are displayed
//1 - Communication logs are not disabled
config.disableCommLog = 0;

// Display Bulletion Board Message with display Criteria
// false (default) - no Criteria
// true - Wull display with criteria as in self service center
config.displayBulletinWithCriteria = true;

//This parameter allow private ticket creation from Self Service or make a ticket private from Agent app
//0 - (default) private ticket feature is disabled
//1 - private ticket feature is enabled
config.enablePrivateTickets = 0;

module.exports = config;
