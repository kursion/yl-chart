(function() {
  var AgChart, agChart, data, genData, onMouseOut, onMouseOver;

  data = [4, 8, 15, 16, 23, 42];

  AgChart = (function() {
    function AgChart(args) {
      this._CONF = {
        tooltip: {
          callback: "single"
        },
        canvas: {
          render: 'circle',
          selector: void 0,
          width: 600.0,
          height: 400.0,
          padding: [0, 0],
          cross: {
            x: {
              show: false,
              color: 'black',
              stroke: 1
            },
            y: {
              show: false,
              color: 'black',
              stroke: 1
            }
          }
        },
        point: {
          mouseover: this.defaultPointMouseover,
          mouseout: this.defaultPointMouseout,
          r: 4,
          color: "#5e5e5e",
          stroke: {
            color: "red",
            width: 4
          }
        },
        ticks: {
          xSize: void 0,
          ySize: void 0
        }
      };
      this._SERIES = this.prepareSeries(args.series);
      this._CANVAS = void 0;
      this._TOOLTIP = void 0;
      this._SCALE = {
        x: void 0,
        y: void 0
      };
      this.defaultConfig(args.config);
      this.computePadding();
      this.computeScales();
      return;
    }

    AgChart.prototype.defaultConfig = function(c) {
      var setConf;
      if (c == null) {
        c = {};
      }
      setConf = function(conf, obj) {
        var k, _ref, _results;
        if (obj != null) {
          _results = [];
          for (k in obj) {
            if (typeof obj[k] === 'object') {
              _results.push(setConf(conf[k], obj[k]));
            } else {
              _results.push(conf[k] = (_ref = obj[k]) != null ? _ref : conf[k]);
            }
          }
          return _results;
        }
      };
      setConf(this._CONF, c);
      return this._CONF;
    };

    AgChart.prototype.defaultPointMouseover = function(point) {
      var curStrokeWidth;
      curStrokeWidth = parseFloat(point.getAttribute("stroke-width"));
      return point.setAttribute("stroke-width", curStrokeWidth * 2);
    };

    AgChart.prototype.defaultPointMouseout = function(point) {
      var curStrokeWidth;
      curStrokeWidth = parseFloat(point.getAttribute("stroke-width"));
      return point.setAttribute("stroke-width", curStrokeWidth / 2);
    };

    AgChart.prototype.toString = function() {
      console.log("Canvas in " + this._CONF.selector);
      console.log("Config", this._CONF);
      console.log("Datas:", this._SERIES);
    };

    AgChart.prototype.computePadding = function() {
      var pad;
      pad = this._CONF.point.r + this._CONF.point.stroke.width / 2.0;
      if (this._CONF.canvas.padding === 'auto') {
        return this._CONF.canvas.padding = [pad, pad];
      }
    };

    AgChart.prototype.maxX = function() {
      var max, point, serie, _i, _j, _len, _len1, _ref, _ref1;
      max = Number.MIN_VALUE;
      _ref = this._SERIES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        serie = _ref[_i];
        _ref1 = serie.data;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          point = _ref1[_j];
          if (point.x > max) {
            max = point.x;
          }
        }
      }
      return max;
    };

    AgChart.prototype.maxY = function() {
      var max, point, serie, _i, _j, _len, _len1, _ref, _ref1;
      max = Number.MIN_VALUE;
      _ref = this._SERIES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        serie = _ref[_i];
        _ref1 = serie.data;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          point = _ref1[_j];
          if (point.y > max) {
            max = point.y;
          }
        }
      }
      return max;
    };

    AgChart.prototype.computeScales = function() {
      var maxX, maxY, _canvas, _pad;
      _canvas = this._CONF.canvas;
      _pad = _canvas.padding;
      maxX = this.maxX();
      maxY = this.maxY();
      this._SCALE.width = d3.scale.linear().domain([0, maxX]).range([_pad[0], _canvas.width - _pad[0]]);
      return this._SCALE.height = d3.scale.linear().domain([0, maxY]).range([_canvas.height - _pad[1], _pad[1]]);
    };

    AgChart.prototype.createCanvas = function() {
      if (this._CONF.canvas.selector == null) {
        throw new Error("No selector defined");
      }
      return this._CANVAS = d3.select(this._CONF.canvas.selector).append('svg').attr('width', this._CONF.canvas.width).attr('height', this._CONF.canvas.height);
    };

    AgChart.prototype.renderXAxis = function() {
      var axisX, height, padding;
      padding = this._CONF.canvas.padding[1];
      height = this._CONF.canvas.height;
      axisX = d3.svg.axis().scale(this._SCALE.width);
      if (this._CONF.ticks.xSize === 'full') {
        axisX.tickSize(height - padding * 2);
      } else if (this._CONF.ticks.xSize) {
        this._CONF.ticks.axisX.tickSize(this._CONF.ticks.xSize);
      }
      return this._CANVAS.append("g").attr("transform", "translate(0," + padding + ")").attr("class", "axis x").call(axisX);
    };

    AgChart.prototype.renderYAxis = function() {
      var axisY, padding, width;
      padding = this._CONF.canvas.padding[0];
      width = this._CONF.canvas.width;
      axisY = d3.svg.axis().scale(this._SCALE.height).orient("left");
      if (this._CONF.ticks.ySize === 'full') {
        axisY.tickSize(-width + padding * 2);
      } else if (this._CONF.ticks.ySize) {
        this._CONF.ticks.axisY.tickSize(this._CONF.ticks.ySize);
      }
      return this._CANVAS.append("g").attr("transform", "translate(" + padding + ", 0)").attr("class", "axis y").call(axisY);
    };

    AgChart.prototype.prepareSeries = function(data) {
      var point, serie, _i, _j, _len, _len1, _ref;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        serie = data[_i];
        _ref = serie.data;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          point = _ref[_j];
          if (serie.config != null) {
            point.config = serie.config;
          }
        }
      }
      return data;
    };

    AgChart.prototype.renderPoints = function() {
      var scaleH, scaleW, series, _canvas, _conf, _scope, _tooltipCallback, _tooltipHide, _tooltipNode, _tooltipShow;
      _scope = this;
      _conf = this._CONF;
      _canvas = this._CANVAS;
      _tooltipShow = this.tooltipShow;
      _tooltipHide = this.tooltipHide;
      _tooltipNode = this._TOOLTIP;
      _tooltipCallback = _conf.tooltip.callback;
      if (typeof _tooltipCallback === "string") {
        _tooltipCallback = this.tooltipCallbacks[_tooltipCallback];
      }
      scaleW = this._SCALE.width;
      scaleH = this._SCALE.height;
      if (_conf.canvas.render === 'dots') {
        series = this._CANVAS.selectAll(".series").data(this._SERIES).enter().append("g").attr("class", "series").attr("id", function(s, i) {
          return "" + i;
        }).attr("title", function(s) {
          return s.name;
        });
        return series.selectAll(".circle").data(function(d) {
          return d.data;
        }).enter().append("circle").attr('cx', function(d) {
          return scaleW(d.x);
        }).attr('cy', function(d) {
          return scaleH(d.y);
        }).attr('data-x', function(d) {
          return d.x;
        }).attr('data-y', function(d) {
          return d.y;
        }).attr('r', (function(d) {
          var _ref, _ref1;
          return (_ref = (_ref1 = d.config) != null ? _ref1.r : void 0) != null ? _ref : _conf.point.r;
        })).attr('stroke', (function(d) {
          var _ref, _ref1, _ref2;
          return (_ref = (_ref1 = d.config) != null ? (_ref2 = _ref1.stroke) != null ? _ref2.color : void 0 : void 0) != null ? _ref : _conf.point.stroke.color;
        })).attr('stroke-width', (function(d) {
          var _ref, _ref1, _ref2;
          return (_ref = (_ref1 = d.config) != null ? (_ref2 = _ref1.stroke) != null ? _ref2.width : void 0 : void 0) != null ? _ref : _conf.point.stroke.width;
        })).attr('fill', (function(d) {
          var _ref, _ref1;
          return (_ref = (_ref1 = d.config) != null ? _ref1.color : void 0) != null ? _ref : _conf.point.color;
        })).on('mouseover', function(d) {
          _conf.point.mouseover({
            canvas: _canvas,
            circleNode: this,
            data: d
          });
          _tooltipNode.html(_tooltipCallback({
            canvas: _canvas,
            tooltipNode: _tooltipNode,
            circleNode: this,
            data: d
          }));
          return _tooltipShow(_tooltipNode, d);
        }).on('mouseout', function(d) {
          _conf.point.mouseout({
            canvas: _canvas,
            circleNode: this,
            data: d
          });
          return _tooltipHide(_tooltipNode);
        });
      } else {
        throw new Error("Unknown render value '" + _canvas.render + "'");
      }
    };

    AgChart.prototype.renderTooltip = function() {
      if (this._TOOLTIP == null) {
        return this._TOOLTIP = d3.select("body").append("div").attr('class', 'tooltip').style('opacity', 0);
      }
    };

    AgChart.prototype.renderCross = function(options) {
      var offsetX, offsetY, padX, padY, _crossX, _crossY;
      padX = options.padding[0];
      padY = options.padding[1];
      offsetX = 10;
      offsetY = 10;
      _crossX = options.canvas.append("line").attr("class", "crossX").attr("x1", -options.width).attr("y1", padY).attr("x2", -options.width).attr("y2", options.height - padY).attr("stroke", options.cross.x.color).attr("stroke-width", options.cross.x.stroke);
      _crossY = options.canvas.append("line").attr("class", "crossY").attr("x1", padX).attr("y1", -options.height).attr("x2", options.width - padX).attr("y2", -options.height).attr("stroke", options.cross.y.color).attr("stroke-width", options.cross.y.stroke);
      return options.canvas.on("mousemove", function(d) {
        if (options.cross.x.show && d3.event.pageX >= padX + offsetX && d3.event.pageX <= options.width - padX + offsetX) {
          _crossX.attr("x1", d3.event.pageX - offsetX).attr("x2", d3.event.pageX - offsetX);
        }
        if (options.cross.y.show && d3.event.pageY >= padY + offsetY && d3.event.pageY <= options.height - padY + offsetY) {
          return _crossY.attr("y1", d3.event.pageY - offsetY).attr("y2", d3.event.pageY - offsetY);
        }
      });
    };

    AgChart.prototype.render = function() {
      if (this._CANVAS == null) {
        this._CANVAS = this.createCanvas();
      }
      this.renderCross({
        canvas: this._CANVAS,
        cross: this._CONF.canvas.cross,
        padding: this._CONF.canvas.padding,
        height: this._CONF.canvas.height,
        width: this._CONF.canvas.width
      });
      this.renderXAxis();
      this.renderYAxis();
      this.renderTooltip();
      return this.renderPoints();
    };

    AgChart.prototype.tooltipShow = function(_tooltipNode, d) {
      var left, top;
      left = d3.event.pageX + d.config.stroke.width;
      top = d3.event.pageY;
      return _tooltipNode.style("left", left + 'px').style("top", top + 'px').transition().duration(200).style("opacity", 0.9);
    };

    AgChart.prototype.tooltipHide = function(_tooltipNode) {
      return _tooltipNode.transition().duration(500).style("opacity", 0);
    };

    AgChart.prototype.tooltipCallbacks = {
      single: function(params) {
        var serieName, swatchColor;
        serieName = params.circleNode.parentNode.getAttribute("title");
        swatchColor = params.circleNode.getAttribute("stroke");
        return ("<div>" + serieName) + ("<div class='swatch' style='background-color: " + swatchColor + "'></div>") + "</div>" + ("<div>" + params.data.x + " " + (params.data.y.toFixed(2)) + "</div>");
      },
      multipleVertical: function(params) {
        var cx, html, x, _circleNode;
        _circleNode = params.circleNode;
        cx = _circleNode.getAttribute('cx');
        x = _circleNode.dataset.x;
        html = "x=" + x;
        $(params.canvas[0]).find("circle[cx='" + cx + "']").each(function(e, node) {
          var serieName, swatchColor;
          serieName = node.parentNode.getAttribute("title");
          swatchColor = node.getAttribute("stroke");
          return html += ("<div>" + serieName + " : " + (params.data.y.toFixed(2))) + ("<div class='swatch' style='background-color: " + swatchColor + "'></div>") + "</div>";
        });
        return html;
      }
    };

    return AgChart;

  })();

  genData = function(len, inter) {
    var els, i, _i, _ref;
    if (inter == null) {
      inter = 1;
    }
    els = [];
    for (i = _i = 0, _ref = len - 1; inter > 0 ? _i <= _ref : _i >= _ref; i = _i += inter) {
      els.push({
        x: i,
        y: Math.random() * 100
      });
    }
    return els;
  };

  onMouseOver = function(params) {
    var cx, strokeWidth, _circleNode;
    _circleNode = params.circleNode;
    cx = _circleNode.getAttribute('cx');
    strokeWidth = parseFloat(_circleNode.getAttribute('stroke-width')) * 4;
    return $(params.canvas[0]).find("circle[cx='" + cx + "']").each(function(e, node) {
      return $(node).attr("stroke-width", strokeWidth);
    });
  };

  onMouseOut = function(params) {
    var cx, strokeWidth, _circleNode;
    _circleNode = params.circleNode;
    cx = _circleNode.getAttribute('cx');
    strokeWidth = parseFloat(_circleNode.getAttribute('stroke-width')) / 4;
    return $(params.canvas[0]).find("circle[cx='" + cx + "']").each(function(e, node) {
      return $(node).attr("stroke-width", strokeWidth);
    });
  };

  agChart = new AgChart({
    config: {
      canvas: {
        render: "dots",
        selector: '#chart1',
        padding: [30, 30],
        cross: {
          x: {
            show: true,
            color: "#44A0FF"
          },
          y: {
            show: false,
            color: "#FFA044"
          }
        }
      },
      tooltip: {
        callback: "multipleVertical"
      },
      point: {
        mouseover: onMouseOver,
        mouseout: onMouseOut,
        r: 3,
        color: "#efefef",
        stroke: {
          width: 3,
          color: "#44A0FF"
        }
      },
      ticks: {
        ySize: "full",
        xSize: "full"
      }
    },
    series: [
      {
        name: "Serie 1",
        data: genData(1000),
        config: {
          stroke: {
            color: "#A044FF",
            width: 1
          }
        }
      }, {
        name: "Serie 2",
        data: genData(100),
        config: {
          stroke: {
            width: 1
          }
        }
      }
    ]
  });

  agChart.render();

  window.agChart = agChart;

}).call(this);