require.config({
  baseUrl: '../../app/js/vendor',
  waitSeconds: 200,
  urlArgs: '',
  paths: {
    'bootstrap': 'bootstrap.min',
    'crypto': 'crypto-js',
    'jquery': 'jquery.min',
    'jquery.cookie': 'jquery.cookie',
    'lobibox': 'lobibox.min',
    'md5': 'jquery.md5',
	'datatable' :'jquery.dataTables',
	'datatablepage':'ellipses',
	'echarts':'echarts.min',
	'echartsMobile':'echarts',
    'jquery.validate': 'jquery.validate.min',
    'page':'../page',
    'jquery.pnotify' : 'jquery.pnotify',
    'WdatePicker':'./WdatePicker',
    'pulpload':'plupload.full.min',
    'fileinput':'fileinput.min',
    'fileinput.zh':'zh',
    'echarts.shine':'theme/shine',
    'typeahead':'bootstrap3-typeahead',
    'spinner':'jquery.spinner',
    'html2canvas':'html2canvas',
    'jspdf':'jspdf.debug',
    'summernote':'summernote/summernote',
    'summernote.zh':'summernote/lang/summernote-zh-CN'
  },
  shim: {
    "jquery.cookie":{
        deps: ['jquery']
    },
    "page":{
        deps: ['jquery']
    },
    'bootstrap': {
        deps: ['jquery']
    },
    'jquery.validate': {
        deps: ['jquery']
    },
    'md5': {
        deps: ['jquery']
    },
    "lobibox":{
        exports:"Lobibox",
        deps:['jquery']
    },
	'datatable':{
	    deps:['jquery']
	},
    'echarts':{
        exports:"echarts",
        deps:['jquery']
    },
    'echartsMobile':{
        exports:"echartsMobile",
        deps:['jquery']
    },
    'jquery.pnotify' : {
		deps : [ 'jquery' ]
	},
    'WdatePicker' : {
		deps : [ 'jquery' ]
	},
	'fileinput':{
		deps:['jquery']
	},
	'fileinput.zh':{
		deps:['jquery','fileinput']
	},
	'typeahead':{
		deps:['bootstrap']
	},
	'spinner':{
		deps:['jquery']
	},
    'html2canvas':{
    	 exports:"html2canvas",
    },
	'jspdf':{
		exports:'jsPDF',
		deps:['html2canvas']
    },
    'datatablepage':{
	    deps:['datatable']
	},
    'summernote':{
        deps:['bootstrap','jquery']
	},
    'summernote.zh':{
        deps:['summernote','bootstrap','jquery']
    }
  }
});
