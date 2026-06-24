// THOR 报价系统 · 共享模块
// 数据适配、选品生成、报价单导入
(function (global) {
  'use strict';

  var ICON_MAP = { hinge: 'h', drawer: 'd', basket: 'b', handle: 'l', light: 'g', switch: 'w', wire: 'w' };

  var DEFAULT_CAB_MAT = '小雨滴';

  var STD_DIMS = {
    '洗手盘地柜': { w: 800, h: 680, d: 720 },
    '地柜': { w: 800, h: 680, d: 720 },
    '灶台吊柜': { w: 800, h: 700, d: 370 },
    '吊柜': { w: 800, h: 700, d: 370 },
    '高柜': { w: 600, h: 2100, d: 570 },
    '上翻门吊柜': { w: 800, h: 700, d: 370 }
  };

  var PNG_HW = [12, 13, 14, 18, 19, 21, 22, 23, 25, 32, 33, 40, 45, 53];

  function cabinetPrice(pricing, series, type) {
    var d = pricing[series];
    if (!d) return 0;
    if (type === '洗手盘地柜' || type === '地柜') return d['地柜680'] || d['地柜720'] || 0;
    if (type === '灶台吊柜' || type === '吊柜') return d['吊柜700'] || d['吊柜800'] || 0;
    if (type === '高柜') return d['地柜720'] || d['地柜680'] || 0;
    if (type === '上翻门吊柜') return d['吊柜700'] || 0;
    return 0;
  }

  function buildTD(data) {
    if (!data) throw new Error('THOR_DATA 未加载，请先引入 data.js');
    return {
      cabinet: { s: data.cabinet.series, t: data.cabinet.types, p: data.cabinet.pricing },
      countertop: { s: data.countertop.series, tk: data.countertop.thicknesses, p: data.countertop.pricing },
      hw: data.hardware.map(function (h) {
        return { n: h.name, p: h.price, u: h.unit, ic: ICON_MAP[h.icon] || 'h', id: h.id };
      })
    };
  }

  function hwImagePath(hwId) {
    var idx = parseInt(String(hwId || '').replace('h', ''), 10);
    if (!idx || idx < 1 || idx > 55) return '';
    var ext = PNG_HW.indexOf(idx) >= 0 ? 'png' : 'jpeg';
    return '03-Converted/01-images/hardware/image' + idx + '.' + ext;
  }

  function buildSelectorProducts(data) {
    var products = [];
    var idx = 0;

    data.cabinet.series.forEach(function (series) {
      data.cabinet.types.forEach(function (type) {
        idx++;
        var dims = STD_DIMS[type] || { w: 800, h: 680, d: 720 };
        products.push({
          id: 'THOR-CB-' + String(idx).padStart(3, '0'),
          category: 'cabinet',
          name: series + ' · ' + type,
          series: series,
          type: type,
          dim: dims.w + '×' + dims.h + '×' + dims.d,
          price: cabinetPrice(data.cabinet.pricing, series, type),
          material: '304不锈钢雨滴板',
          color: '木纹/纯色可选',
          w: dims.w,
          h: dims.h,
          d: dims.d,
          images: [],
          scenes: []
        });
      });
    });

    data.cabinet.series.forEach(function (series, i) {
      var panel = (data.cabinet.pricing[series] || {}).panel || 0;
      products.push({
        id: 'THOR-DR-' + String(i + 1).padStart(3, '0'),
        category: 'door',
        name: series + ' · 柜门',
        series: series,
        dim: '见光板',
        price: panel,
        material: '304不锈钢',
        color: '木纹/纯色可选',
        unit: '㎡',
        images: [],
        scenes: []
      });
    });

    data.hardware.forEach(function (h) {
      var img = hwImagePath(h.id);
      products.push({
        id: h.id.toUpperCase(),
        category: 'hardware',
        name: h.name,
        dim: '标准',
        price: h.price,
        material: '不锈钢/铝合金',
        hwId: h.id,
        unit: h.unit,
        images: img ? [img] : [],
        scenes: []
      });
    });

    data.countertop.series.forEach(function (series, i) {
      var tk = '12mm';
      var price = (data.countertop.pricing[series] || {})[tk] || 0;
      if (!price) {
        var keys = Object.keys(data.countertop.pricing[series] || {});
        for (var k = 0; k < keys.length; k++) {
          var v = data.countertop.pricing[series][keys[k]];
          if (v > 0) { tk = keys[k]; price = v; break; }
        }
      }
      products.push({
        id: 'THOR-CT-' + String(i + 1).padStart(3, '0'),
        category: 'countertop',
        name: series,
        series: series,
        dim: '600×' + tk + '（可定制）',
        price: price,
        thickness: tk,
        material: '不锈钢复合双层',
        images: [],
        scenes: []
      });
    });

    [
      { id: 'THOR-SK-001', name: '手工单槽', price: 500 },
      { id: 'THOR-SK-002', name: '抽拉龙头', price: 350 }
    ].forEach(function (s) {
      products.push({
        id: s.id,
        category: 'sink',
        name: s.name,
        dim: '标准',
        price: s.price,
        material: '不锈钢',
        images: [],
        scenes: []
      });
    });

    products.push({
      id: 'THOR-EL-001',
      category: 'electric',
      name: '嵌入式蒸烤一体机',
      dim: '标准',
      price: 3000,
      material: '',
      images: [],
      scenes: []
    });

    products.push({
      id: 'THOR-EX-001',
      category: 'extra',
      name: '灶炉开槽费',
      dim: '—',
      price: 100,
      material: '',
      images: [],
      scenes: []
    });

    return products;
  }

  function importToQuote(products, arrays, options) {
    options = options || {};
    var count = 0;
    var cats = {};
    products.forEach(function (p) { cats[p.category] = true; });

    if (options.replaceDefaults !== false) {
      if (cats.cabinet && isDefaultCabinet(arrays.cb)) arrays.cb.length = 0;
      if (cats.countertop && isDefaultCountertop(arrays.ct)) arrays.ct.length = 0;
      if (cats.hardware && isDefaultHardware(arrays.hw)) arrays.hw.length = 0;
    }

    products.forEach(function (p) {
      switch (p.category) {
        case 'cabinet':
          arrays.cb.push({
            n: p.type,
            c: p.id,
            w: p.w || 800,
            h: p.h || 680,
            d: p.d || 720,
            m: p.series,
            dm: p.series,
            r: 1,
            q: 1,
            u: '米'
          });
          count++;
          break;
        case 'door':
          if (arrays.cb.length) {
            arrays.cb.forEach(function (r) { r.dm = p.series; });
            count++;
          }
          break;
        case 'countertop':
          arrays.ct.push({
            n: '台面',
            c: p.id,
            w: 3000,
            h: 5,
            d: 600,
            m: p.name,
            tk: p.thickness || '12mm',
            r: 1,
            q: 1,
            u: '米'
          });
          count++;
          break;
        case 'hardware':
          arrays.hw.push({
            n: p.name,
            id: p.hwId || '',
            c: p.id,
            w: 0,
            h: 0,
            d: 0,
            para: '',
            q: 1,
            u: p.unit || '个',
            p: p.price
          });
          count++;
          break;
        case 'sink':
          arrays.sk.push({
            n: p.name,
            c: p.id,
            w: 0,
            h: 0,
            d: 0,
            para: '',
            q: 1,
            u: '个',
            p: p.price
          });
          count++;
          break;
        case 'electric':
          arrays.el.push({
            n: p.name,
            c: p.id,
            w: 0,
            h: 0,
            d: 0,
            para: '',
            q: 1,
            u: '台',
            p: p.price
          });
          count++;
          break;
        case 'extra':
          arrays.ex.push({
            n: p.name,
            c: p.id,
            w: 0,
            h: 0,
            d: 0,
            para: '',
            q: 1,
            u: '个',
            p: p.price
          });
          count++;
          break;
      }
    });
    return count;
  }

  function isDefaultCabinet(arr) {
    return arr.length === 1 && arr[0].n === '洗手盘地柜' && arr[0].m === DEFAULT_CAB_MAT && !arr[0].c;
  }

  /** 柜体非标系数 = 实际高度 / 默认高度，四舍五入一位小数 */
  function cabNsCoef(actualH, stdH) {
    if (!stdH) return 1;
    var h = actualH || stdH;
    return Math.round((h / stdH) * 10) / 10;
  }

  /** 台面宽度非标系数 */
  function ctWidthCoef(widthMm) {
    var w = widthMm || 600;
    if (w <= 600) return 1;
    if (w <= 650) return 1.3;
    if (w <= 900) return 1.5;
    if (w <= 1050) return 2;
    return 2;
  }

  /** 台面计价长度：不足 1000mm 按 1000mm */
  function ctEffLengthMm(lenMm) {
    return Math.max(lenMm || 0, 1000);
  }

  function isDefaultCountertop(arr) {
    return arr.length === 1 && arr[0].n === '台面' && arr[0].m === '琉晶-丝纹GY01' && !arr[0].c;
  }

  function isDefaultHardware(arr) {
    return arr.length === 1 && arr[0].n === '百隆107°集成阻尼全盖铰链' && arr[0].id === 'h1' && !arr[0].c;
  }

  global.ThorShared = {
    buildTD: buildTD,
    buildSelectorProducts: buildSelectorProducts,
    importToQuote: importToQuote,
    cabinetPrice: cabinetPrice,
    hwImagePath: hwImagePath,
    cabNsCoef: cabNsCoef,
    ctWidthCoef: ctWidthCoef,
    ctEffLengthMm: ctEffLengthMm,
    DEFAULT_CAB_MAT: DEFAULT_CAB_MAT,
    STD_DIMS: STD_DIMS
  };
})(window);
