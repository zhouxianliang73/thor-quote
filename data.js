// THOR 报价数据库 - 由 02-Database/thor-pricing.json5 生成
// 更新价格时: edit json5 → run generate script → git push
const THOR_DATA = 



{
  
  cabinet: {
    series: [
      '大千云纹','大悦韵纹','大影臻纹','大彩绚丽','大观金属',
      '大语玉润','大传质影','铂金系列','铂金光学膜',
      '云纹系列','韵纹系列','臻纹系列','绚丽系列','金属系列','玉润系列','质影/原色'
    ],
    types: ['洗手盘地柜','地柜','灶台吊柜','吊柜','高柜','上翻门吊柜'],
    pricing: {
      大千云纹:{'地柜680':5627,'地柜720':5908,'吊柜700':5077,'吊柜800':5331,'吊柜900':5597,panel:1598},
      大悦韵纹:{'地柜680':6071,'地柜720':6375,'吊柜700':5535,'吊柜800':5811,'吊柜900':6102,panel:2226},
      大影臻纹:{'地柜680':6753,'地柜720':7090,'吊柜700':6198,'吊柜800':6508,'吊柜900':6833,panel:3222},
      大彩绚丽:{'地柜680':5946,'地柜720':6243,'吊柜700':5405,'吊柜800':5676,'吊柜900':5959,panel:2050},
      大观金属:{'地柜680':6240,'地柜720':6552,'吊柜700':5715,'吊柜800':6001,'吊柜900':6301,panel:2467},
      大语玉润:{'地柜680':6874,'地柜720':7218,'吊柜700':6361,'吊柜800':6679,'吊柜900':7013,panel:3365},
      大传质影:{'地柜680':8145,'地柜720':8552,'吊柜700':7672,'吊柜800':8056,'吊柜900':8459,panel:5193},
      铂金系列:{'地柜680':4297,'地柜720':4511,'吊柜700':3883,'吊柜800':4077,'吊柜900':4281,panel:1397},
      铂金光学膜:{'地柜680':4502,'地柜720':4727,'吊柜700':4095,'吊柜800':4300,'吊柜900':4515,panel:1602},
      云纹系列:{'地柜680':4631,'地柜720':4863,'吊柜700':4227,'吊柜800':4439,'吊柜900':4661,panel:1598},
      韵纹系列:{'地柜680':5075,'地柜720':5329,'吊柜700':4686,'吊柜800':4920,'吊柜900':5166,panel:2226},
      臻纹系列:{'地柜680':5697,'地柜720':5982,'吊柜700':5286,'吊柜800':5550,'吊柜900':5827,panel:3222},
      绚丽系列:{'地柜680':4953,'地柜720':5201,'吊柜700':4560,'吊柜800':4787,'吊柜900':5027,panel:2050},
      金属系列:{'地柜680':5161,'地柜720':5419,'吊柜700':4781,'吊柜800':5020,'吊柜900':5271,panel:2467},
      玉润系列:{'地柜680':5796,'地柜720':6086,'吊柜700':5426,'吊柜800':5698,'吊柜900':5982,panel:3365},
      质影/原色:{'地柜680':7359,'地柜720':7727,'吊柜700':7041,'吊柜800':7393,'吊柜900':7763,panel:5193}
    },
    
    images: {}
  },

  
  countertop: {
    series: ['琉晶-丝纹GY01','琉晶-绘纹GY02','晶灵-蚀刻GY03','晶灵-雾砂GY04','晶灵-珠星GY05','晶灵-雾瓷GY08','品灵-柳叶GY09','晶灵-印迹GY10','晶砾-银砂GY11','304#喷砂纹实心','琉晶等实心多层'],
    thicknesses: ['5mm','10mm','12mm','15mm'],
    pricing: {
      '琉晶-丝纹GY01':{'5mm':0,'10mm':0,'12mm':1655,'15mm':0},
      '琉晶-绘纹GY02':{'5mm':0,'10mm':0,'12mm':1585,'15mm':0},
      '晶灵-蚀刻GY03':{'5mm':0,'10mm':0,'12mm':2765,'15mm':0},
      '晶灵-雾砂GY04':{'5mm':0,'10mm':0,'12mm':3405,'15mm':0},
      '晶灵-珠星GY05':{'5mm':0,'10mm':0,'12mm':2765,'15mm':0},
      '晶灵-雾瓷GY08':{'5mm':0,'10mm':0,'12mm':3569,'15mm':0},
      '品灵-柳叶GY09':{'5mm':0,'10mm':0,'12mm':3405,'15mm':0},
      '晶灵-印迹GY10':{'5mm':0,'10mm':0,'12mm':3405,'15mm':0},
      '晶砾-银砂GY11':{'5mm':5000,'10mm':0,'12mm':0,'15mm':0},
      '304#喷砂纹实心':{'5mm':2506,'10mm':5035,'12mm':0,'15mm':0},
      '琉晶等实心多层':{'5mm':4887,'10mm':6986,'12mm':0,'15mm':0}
    },
    images: {}
  },

  
  hardware: [
    {id:'h1',name:'百隆107°集成阻尼全盖铰链',price:77,unit:'个',icon:'hinge'},
    {id:'h2',name:'百隆107°集成阻尼半盖铰链',price:82,unit:'个',icon:'hinge'},
    {id:'h3',name:'百隆107°集成阻尼内掩铰链',price:83,unit:'个',icon:'hinge'},
    {id:'h4',name:'百隆95°集成阻尼转角柜门铰链',price:110,unit:'个',icon:'hinge'},
    {id:'h5',name:'反弹器',price:14,unit:'个',icon:'hinge'},
    {id:'h6',name:'百隆155°集成阻尼全盖铰链',price:121,unit:'个',icon:'hinge'},
    {id:'h7',name:'天地铰链(铝框)',price:690,unit:'套',icon:'hinge'},
    {id:'h8',name:'百隆魅宝低抽400',price:1141,unit:'套',icon:'drawer'},
    {id:'h9',name:'百隆魅宝扶杆高抽400',price:1406,unit:'套',icon:'drawer'},
    {id:'h10',name:'百隆全拉托底轨410(阻尼)',price:624,unit:'套',icon:'drawer'},
    {id:'h11',name:'百隆反弹全拉托底轨410',price:1005,unit:'套',icon:'drawer'},
    {id:'h12',name:'百隆乐薄低抽450',price:1266,unit:'套',icon:'drawer'},
    {id:'h13',name:'百隆乐薄高抽450',price:1605,unit:'套',icon:'drawer'},
    {id:'h14',name:'百隆乐薄内低抽450',price:2091,unit:'套',icon:'drawer'},
    {id:'h15',name:'百隆全拉隔板锁定装置',price:394,unit:'套',icon:'drawer'},
    {id:'h16',name:'铝合金内分隔件600',price:603,unit:'套',icon:'drawer'},
    {id:'h17',name:'铝合金内分隔件800',price:941,unit:'套',icon:'drawer'},
    {id:'h18',name:'可调实木抽屉分隔件A',price:1003,unit:'套',icon:'drawer'},
    {id:'h19',name:'希勒3.0三边平篮800',price:868,unit:'套',icon:'basket'},
    {id:'h20',name:'希勒3.0三边碗碟篮800',price:1251,unit:'套',icon:'basket'},
    {id:'h21',name:'希勒3.0调味篮400',price:1611,unit:'套',icon:'basket'},
    {id:'h22',name:'希勒4.0三边平篮800',price:1423,unit:'套',icon:'basket'},
    {id:'h23',name:'希勒4.0三边碗碟篮800',price:2000,unit:'套',icon:'basket'},
    {id:'h24',name:'希勒飞碟篮900',price:3431,unit:'套',icon:'basket'},
    {id:'h25',name:'希勒小怪物篮900',price:3339,unit:'套',icon:'basket'},
    {id:'h26',name:'希勒四层高柜连动拉篮450',price:2919,unit:'套',icon:'basket'},
    {id:'h27',name:'希勒六层高柜连动拉篮600',price:4180,unit:'套',icon:'basket'},
    {id:'h28',name:'宁卡抽拉式垃圾桶',price:2817,unit:'套',icon:'basket'},
    {id:'h29',name:'L型免拉手',price:59,unit:'米',icon:'handle'},
    {id:'h30',name:'U型免拉手',price:73,unit:'米',icon:'handle'},
    {id:'h31',name:'L型灯光免拉手',price:220,unit:'米',icon:'handle'},
    {id:'h32',name:'水晶拉手(32孔距)',price:29,unit:'个',icon:'handle'},
    {id:'h33',name:'水晶拉手(96孔距)',price:169,unit:'个',icon:'handle'},
    {id:'h34',name:'金属拉手(96孔距)',price:14,unit:'个',icon:'handle'},
    {id:'h35',name:'金属拉手(128孔距)',price:18,unit:'个',icon:'handle'},
    {id:'h36',name:'皮革拉手',price:49,unit:'个',icon:'handle'},
    {id:'h37',name:'嵌入式灯条600',price:104,unit:'个',icon:'light'},
    {id:'h38',name:'嵌入式灯条800',price:140,unit:'个',icon:'light'},
    {id:'h39',name:'嵌入式斜照灯条600',price:116,unit:'个',icon:'light'},
    {id:'h40',name:'抽屉感应灯600',price:348,unit:'个',icon:'light'},
    {id:'h41',name:'抽屉感应灯800',price:432,unit:'个',icon:'light'},
    {id:'h42',name:'双面发光层板灯600',price:140,unit:'个',icon:'light'},
    {id:'h43',name:'双面发光层板灯800',price:176,unit:'个',icon:'light'},
    {id:'h44',name:'嵌入式手扫感应灯600',price:212,unit:'个',icon:'light'},
    {id:'h45',name:'单门碰感应开关',price:112,unit:'个',icon:'switch'},
    {id:'h46',name:'双门碰感应开关',price:172,unit:'个',icon:'switch'},
    {id:'h47',name:'手扫感应开关',price:112,unit:'个',icon:'switch'},
    {id:'h48',name:'触摸感应开关',price:128,unit:'个',icon:'switch'},
    {id:'h49',name:'人体感应开关',price:132,unit:'个',icon:'switch'},
    {id:'h50',name:'集控电源60W',price:340,unit:'个',icon:'switch'},
    {id:'h51',name:'集控电源30W',price:180,unit:'个',icon:'switch'},
    {id:'h52',name:'级联线',price:14,unit:'个',icon:'wire'},
    {id:'h53',name:'玻璃夹板灯600',price:90,unit:'个',icon:'light'},
    {id:'h54',name:'嵌入式灯条1500',price:246,unit:'个',icon:'light'},
    {id:'h55',name:'嵌入式灯条1800',price:295,unit:'个',icon:'light'}
  ],

  
  rules: {
    countertop: {
      
      standard: { width: 600, thickness: 15, frontHeight: '12/19/39', splashHeight: 46, backHeight: 50 },
      
      widthMultiplier: [
        { max: 600,  multiplier: 1.0 },
        { max: 650,  multiplier: 1.3 },
        { max: 900,  multiplier: 1.5 },
        { max: 1050, multiplier: 2.0 }
      ],
      
      minLength: 1000,
      
      edgeUpcharge: { '前斜边': 500, '前弧边': 500, unit: '元/米' }
    },

    
    processing: {
      stoveHole: 300,       
      sinkHole: 900,        
      sinkHoleNote: '公司配套水槽可免收',
      woodCrate: 300,       
      unit: '元/个'
    },

    
    cabinet: {
      
      included: '柜体及连接件、门铰、门板、可调脚、柜体铝合金免拉手',
      
      wallCabinet: { halfPrice: 0.65, halfHeightRatio: 0.5 },
      
      tallCabinet: { halfMultiplier: 2, fullMultiplier: 3 },
      
      topPanel: {
        noPattern: { threshold: 100, singleLayer: 400, unit: '元/米' },
        minArea: 0.1
      },
      
      baseShoe: {
        '布纹板': 270,
        '喷粉': 400,
        unit: '元/米'
      },
      
      doorUpcharges: {
        '极光M.L48': 200,
        '极光M.L49': 120,
        '斜边门': 400,
        '弧边门': 400,
        '不锈钢压型/铝框造型': 1000,
        '格栅门': 2000,
        unit: '元/㎡'
      },
      
      thicknessUpcharges: {
        '18mm': { default: true },
        '22mm': { upcharge: 1000, withHandle: 1500, unit: '元/㎡' }
      },
      
      materialMultiplier: {
        '哑光小雨滴板': 1.0,
        '布纹板': 1.0,
        '喷粉柜体': 1.1,
        '云纹板体': 1.05
      },
      
      doubleBackPanel: { upcharge: 1150, unit: '元/㎡' },
      
      wallHandle: { default: '斜边门型或门板下扣10mm', bottomHandleUpcharge: 150, unit: '元/m' }
    }
  }
}