import Mock from 'mockjs';
import api from '../api';

// 列表数据
Mock.mock(new RegExp(api.list), 'get', {
  code: 200,
  msg: '',
  data: [
    {
      id: 1,
      name: '扁豆焖面(实惠)',
      distance: '150m',
      desc: '好吃的扁豆焖面',
      price: '12',
      oldPrice: '18',
      sales: '@integer(50, 200)',
      star: 5,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 9,
        environment: 8.7,
        service: 8.9,
        name: '鸿运饭店',
        address: '双井北街33号',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '和朋友一起吃的，真的棒棒滴，胃口棒棒滴，环境棒棒滴，不忘此行，已收藏。',
          pics: ['http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180']
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '被朋友拉过去的，谢谢我的朋友。本来不想吃的，但是最后就我吃的最多。',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '挺好滴',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
      promotion: [
        {
          type: 1,
          text: '9.2折'
        }
      ]
    },
    {
      id: 2,
      name: '葱花饼(实惠)',
      distance: '250m',
      desc: '诱人葱花饼',
      price: '14',
      oldPrice: '16',
      sales: '@integer(50, 200)',
      star: 4,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 7,
        environment: 8.3,
        service: 7.9,
        name: '稀客饭店',
        address: '南街交汇东400米',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '和朋友一起吃的，真的棒棒滴，胃口棒棒滴，环境棒棒滴，不忘此行，已收藏。',
          pics: ['http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180']
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 3,
          text: '挺好滴',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
      promotion: [
        {
          type: 0,
          text: '尊享双人餐，四人餐'
        }
      ]
    },
    {
      id: 3,
      name: '牛肉馅饼',
      distance: '120m',
      desc: '货真价实的牛肉',
      price: '24',
      oldPrice: '31',
      sales: '@integer(50, 200)',
      star: 5,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 8,
        environment: 8.7,
        service: 8.9,
        name: '鸿茂饭店',
        address: '双井北街',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '和朋友一起吃的，真的棒棒滴，胃口棒棒滴，环境棒棒滴，不忘此行，已收藏。',
          pics: ['http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '挺好滴',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
      promotion: [
        {
          type: 0,
          text: '满100减20元'
        }
      ]
    },
    {
      id: 4,
      name: '八宝酱菜(实惠)',
      distance: '530m',
      desc: '酱菜，有味道',
      price: '4',
      oldPrice: '',
      sales: '@integer(350, 800)',
      star: 4,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 7,
        environment: 9.7,
        service: 7.8,
        name: '好运来',
        address: '北汇街',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 4,
          text: '挺好滴',
          pics: ['http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
      promotion: []
    },
    {
      id: 5,
      name: '糊塌子(实惠)',
      distance: '224m',
      desc: '糊塌子，物美价廉',
      price: '3',
      oldPrice: '6',
      sales: '@integer(350, 800)',
      star: 5,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 8,
        environment: 9.3,
        service: 7.9,
        name: '酒仙楼',
        address: '交汇北街56号',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '和朋友一起吃的，真的棒棒滴，胃口棒棒滴，环境棒棒滴，不忘此行，已收藏。',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '被朋友拉过去的，谢谢我的朋友。本来不想吃的，但是最后就我吃的最多。',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
      promotion: []
    },
    {
      id: 6,
      name: '皮蛋瘦肉粥(实惠)',
      distance: '424m',
      desc: '咸粥',
      price: '4',
      oldPrice: '6',
      sales: '@integer(350, 800)',
      star: 5,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 8,
        environment: 9.3,
        service: 7.9,
        name: '八仙楼',
        address: '北街西口56号',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '胃口棒棒滴，环境棒棒滴，已收藏。',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '被朋友拉过去的，谢谢我的朋友。',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
      promotion: []
    },
    {
      id: 7,
      name: '招牌猪肉白菜锅贴/10个',
      distance: '824m',
      desc: '招牌猪肉白菜锅贴',
      price: '17',
      oldPrice: '23',
      sales: '@integer(350, 800)',
      star: 5,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 8,
        environment: 9.3,
        service: 7.9,
        name: '伊莱居',
        address: '北街西口88号',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '环境棒棒滴，已收藏。',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 3,
          text: '量太少',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 2,
          text: '不好吃',
          pics: []
        }
      ],
      promotion: []
    },
    {
      id: 8,
      name: '红豆薏米美肤粥(实惠)',
      distance: '1324m',
      desc: '美肤',
      price: '14',
      oldPrice: '',
      sales: '@integer(350, 800)',
      star: 5,
      cartNum: 0,
      checked: 1,
      imgUrl: 'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 8,
        environment: 9.3,
        service: 7.9,
        name: '会友居',
        address: '河洛口38号',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '好喝',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '味道好极了',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '推荐小姐姐们尝试一下',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
      promotion: []
    }
  ]
});

// 用户数据
Mock.mock(new RegExp(api.user), 'get', {
  code: 200,
  msg: '',
  data: {
    username: '@name',
    password: '@word(8, 10)',
    avatar: 'https://lorempixel.com/200/200/?@natural'
  }
});
