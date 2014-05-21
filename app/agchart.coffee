module.exports = exp = {}

exp.Main = class Main
  constructor: (args) ->
    @_CONF =
      tooltip:
        callback: "single"
        alwaysInside: true
      canvas:
        render: "dots"
        label:
          x:
            text: null
            size: 10
            color: "#7f7f7f"
          y:
            text: null
            size: 10
            color: "#7f7f7f"
        selector: undefined
        width: 600.0
        height: 400.0
        padding: [0,0] #left/right, bottom/top
        cross:
          x:
            show: false
            color: 'black'
            stroke: 1
            offset: 10
          y:
            show: false
            color: 'black'
            stroke: 1
            offset: 1
      point:
        onMouseover: "singlePoint"
        onMouseout: "singlePoint"
        r: 4
        color: "#5e5e5e"
        stroke:
          color: "red"
          width: 4
      axis:
        x:
          tickSize: undefined
          orient: "bottom"
          tickColor: "#efefef"
          tickWidth: 2
          strokeWidth: 1
          color: "#2f2f2f"
        y:
          tickSize: undefined
          orient: "left"
          tickColor: "#efefef"
          tickWidth: 2
          strokeWidth: 1
          color: "#2f2f2f"
    @_SERIES = @prepareSeries args.series
    @_CANVAS = undefined
    @_TOOLTIP = undefined
    @_SCALE =
      x: undefined
      y: undefined

    @defaultConfig args.config
    @computePadding()
    @computeScales()
    return

  # Define custom value for the configuration
  defaultConfig: (c={}) ->
    setConf = (conf,obj) ->
      if obj?
        for k of obj
          if typeof obj[k] == 'object'
            setConf conf[k], obj[k]
          else
            conf[k] = obj[k] ? conf[k]
    setConf(@_CONF,c)
    return @_CONF

  # Effects for the events
  effects:
    singlePoint:
      onMouseover: (params) ->
        _circleNode = params.circleNode
        curStrokeWidth =
          parseFloat( _circleNode.getAttribute("stroke-width") )
        _circleNode.setAttribute("stroke-width", curStrokeWidth*2)
      onMouseout: (params) ->
        _circleNode = params.circleNode
        curStrokeWidth =
          parseFloat( _circleNode.getAttribute("stroke-width") )
        _circleNode.setAttribute("stroke-width", curStrokeWidth/2)
    multipleVertical:
      onMouseover:  (params) ->
        _circleNode = params.circleNode
        cx = _circleNode.getAttribute('cx')
        strokeWidth = parseFloat(_circleNode.getAttribute('stroke-width'))*4
        $(params.canvas[0]).find("circle[cx='#{cx}']").each((e, node)->
          $(node).attr("stroke-width", strokeWidth)
        )

      onMouseout: (params) ->
        _circleNode = params.circleNode
        cx = _circleNode.getAttribute('cx')
        strokeWidth = parseFloat(_circleNode.getAttribute('stroke-width'))/4
        $(params.canvas[0]).find("circle[cx='#{cx}']").each((e, node)->
          $(node).attr("stroke-width", strokeWidth)
        )
  toString: ->
    console.log "Canvas in #{@_CONF.selector}"
    console.log "Config", @_CONF
    console.log "Datas:", @_SERIES
    return

  computePadding: ->
    # What is the size of a point
    pad = @_CONF.point.r+@_CONF.point.stroke.width/2.0
    if @_CONF.canvas.padding == 'auto'
      @_CONF.canvas.padding = [pad,pad]

  maxX: ->
    max = Number.MIN_VALUE
    for serie in @_SERIES
      for point in serie.data
        max = point.x if point.x > max
    return max

  maxY: ->
    max = Number.MIN_VALUE
    for serie in @_SERIES
      for point in serie.data
        max = point.y if point.y > max
    return max

  computeScales: ->
    _canvas = @_CONF.canvas
    _pad = _canvas.padding
    maxX = @maxX()
    maxY = @maxY()
    @_SCALE.width = d3.scale.linear()
      .domain([0,maxX])
      .nice() # end with round number
      .range([_pad[0], _canvas.width-_pad[0]])
    @_SCALE.height = d3.scale.linear()
      .domain([0,maxY])
      .nice()
      .range([_canvas.height-_pad[1], _pad[1]])

  createCanvas: ->
    throw new Error("No selector defined") if not @_CONF.canvas.selector?
    @_CANVAS = d3.select(@_CONF.canvas.selector)
      .append('svg')
      .attr("fill", "white")
      .attr('width', @_CONF.canvas.width)
      .attr('height', @_CONF.canvas.height)

  renderLabel: (params={
    label:
      color: null
      size: null
      trans: null
      text: ""
    class: null }) ->
    @_CANVAS.append("text")
      .attr("fill", params.label.color)
      .attr("class", "label #{params.class}")
      .attr("font-size", params.label.size+"px")
      .attr("text-anchor", "middle")
      .attr("transform", params.label.trans)
      .text(params.label.text)

  renderAxis: (params={
    scale:  null
    height: null
    width:  null
    padding:null
    orient: null
    trans:  null
    label:  null }) ->
    axis = d3.svg.axis()
      .scale(params.scale)
      .orient(params.orient)
      .tickSize(params.tickSize)
    gaxis = @_CANVAS
      .append("g")
      .attr("transform", params.trans)
      .attr("class", "axis #{params.class}")
      .call(axis)

    @renderLabel(params)

    gaxis.selectAll("line")
      .attr("stroke", params.color)
      .attr("stroke-width", params.strokeWidth)

    # Selecting the ticks only without the first one
    gaxis.selectAll("line").filter((d) -> return d)
      .attr("stroke", params.tickColor)
      .attr("width-stroke", params.tickWidth)

    # Trick to hide the path around the graph
    gaxis.selectAll("path")
      .style("display", "none")

    # Color of the text on axis
    gaxis.selectAll("text")
      .attr("fill", params.label.color)
      .attr("font-size", params.label.size)

  renderXAxis: ->
    padding = @_CONF.canvas.padding[1]
    height = @_CONF.canvas.height
    width = @_CONF.canvas.width
    trans = "translate(0, #{padding})"
    label = @_CONF.canvas.label.x
    label.trans =
      "translate(#{width/2}, #{height-1})"
    tickSize = @_CONF.axis.x.tickSize
    tickSize =  height-padding*2 if tickSize == 'full'
    params = {
      class: "x"
      height: @_CONF.canvas.height
      width: @_CONF.canvas.width/2
      scale: @_SCALE.width
      tickSize: tickSize
      padding: padding
      label: label
      orient: @_CONF.axis.x.orient
      trans: trans
      tickColor: @_CONF.axis.x.tickColor
      tickWidth: @_CONF.axis.x.tickWidth
      color: @_CONF.axis.x.color
      strokeWidth: @_CONF.axis.x.strokeWidth
    }
    axis = @renderAxis(params)

  renderYAxis: ->
    padding = @_CONF.canvas.padding[0]
    height = @_CONF.canvas.height
    width = @_CONF.canvas.width
    trans = "translate(#{padding}, 0)"
    label = @_CONF.canvas.label.y
    label.trans =
      "rotate(90) translate(#{height/2}, #{-padding})"

    tickSize = @_CONF.axis.y.tickSize
    tickSize = -width+padding*2 if tickSize == 'full'

    params = {
      class: "y"
      height: @_CONF.canvas.height
      width: @_CONF.canvas.width
      scale: @_SCALE.height
      tickSize: tickSize
      padding: padding
      label: label
      orient: @_CONF.axis.y.orient
      trans: trans
      tickColor: @_CONF.axis.y.tickColor
      tickWidth: @_CONF.axis.y.tickWidth
      color: @_CONF.axis.y.color
      strokeWidth: @_CONF.axis.y.strokeWidth
    }
    axis = @renderAxis(params)


  prepareSeries: (data) ->
    # Adding the configuration to each points
    for serie in data
      for point in serie.data
        point.config = serie.config if serie.config?
    data

  renderPoints: ->
    _scope  = @
    _conf   = @_CONF
    _canvas = @_CANVAS
    _effects = @effects
    _tooltipShow = @tooltip.show
    _tooltipHide = @tooltip.hide
    _tooltipNode = @_TOOLTIP
    _tooltipCallback = _conf.tooltip.callback
    if typeof(_tooltipCallback) == "string"
      _tooltipCallback = @tooltip.callbacks[_tooltipCallback]
    scaleW = @_SCALE.width
    scaleH = @_SCALE.height

    if _conf.canvas.render == 'dots'
      series = @_CANVAS.selectAll(".series")
        .data(@_SERIES).enter()
          .append("g")
          .attr("class", "series")
          .attr("id", (s, i)->"#{i}")
          .attr("title", (s)->s.name)

      series.selectAll(".circle")
        .data((d) -> d.data) # 's' for a single serie
        .enter().append("circle")
          .attr('cx', (d) -> scaleW(d.x))
          .attr('cy', (d) -> scaleH(d.y))
          .attr('data-x', (d) -> d.x)
          .attr('data-y', (d) -> d.y)
          .attr('r', ( (d) ->
            d.config?.r ?  _conf.point.r))
          .attr('stroke',( (d) ->
            d.config?.stroke?.color ? _conf.point.stroke.color))
          .attr('stroke-width', ( (d) ->
            d.config?.stroke?.width ? _conf.point.stroke.width))
          .attr('fill', ((d)->
            d.config?.color ? _conf.point.color))
          .on('mouseover', (d)->
            effect = _conf.point.onMouseover
            if typeof effect == 'string'
              effect = _effects[effect].onMouseover
            effect(
              canvas: _canvas
              circleNode: this
              data: d
            )

            _tooltipNode.html( _tooltipCallback(
              canvas: _canvas
              tooltipNode: _tooltipNode
              circleNode: this
              data: d
            ))

            conf =
              canvas:
                width: _conf.canvas.width
                height: _conf.canvas.height
              tooltip:
                alwaysInside: _conf.tooltip.alwaysInside
            _tooltipShow(conf, _tooltipNode, d)
          )
          .on('mouseout', (d) ->
            effect = _conf.point.onMouseout
            if typeof effect == 'string'
              effect = _effects[effect].onMouseout
            effect(
              canvas: _canvas
              circleNode: this
              data: d
            )
            _tooltipHide(_tooltipNode)
          )
    else
      throw new Error("Unknown render value '#{_canvas.render}'")

  renderTooltip: ->
    if not @_TOOLTIP?
      @_TOOLTIP = d3.select("body").append("div")
        .attr('class', 'tooltip')
        .style('opacity', 0)

  renderCross: (options)->
    padX = options.padding[0]
    padY = options.padding[1]
    offsetX = @_CONF.canvas.cross.x.offset
    offsetX = @_CONF.canvas.cross.y.offset
    _crossX = options.canvas.append("line")
      .attr("class", "crossX")
      .attr("x1", -options.width).attr("y1", padY)
      .attr("x2", -options.width).attr("y2", options.height-padY)
      .attr("stroke", options.cross.x.color)
      .attr("stroke-width", options.cross.x.stroke)
    _crossY = options.canvas.append("line")
      .attr("class", "crossY")
      .attr("x1", padX).attr("y1", -options.height)
      .attr("x2", options.width-padX).attr("y2", -options.height)
      .attr("stroke", options.cross.y.color)
      .attr("stroke-width", options.cross.y.stroke)
    options.canvas.on("mousemove", (d)->
      if options.cross.x.show and
      d3.event.pageX >= padX+offsetX and
      d3.event.pageX <= options.width-padX+offsetX
        _crossX
          .attr("x1", d3.event.pageX-offsetX)
          .attr("x2", d3.event.pageX-offsetX)
      if options.cross.y.show and
      d3.event.pageY >= padY+offsetY and
      d3.event.pageY <= options.height-padY+offsetY
        _crossY
          .attr("y1", d3.event.pageY-offsetY)
          .attr("y2", d3.event.pageY-offsetY)
    )

  render: ->
    @_CANVAS = @createCanvas() if not @_CANVAS?
    @renderCross(
      canvas: @_CANVAS
      cross: @_CONF.canvas.cross
      padding: @_CONF.canvas.padding
      height: @_CONF.canvas.height
      width: @_CONF.canvas.width
    )
    @renderXAxis()
    @renderYAxis()
    @renderTooltip()
    @renderPoints() # Depends on axis and tooltip

  tooltip:
    show: (conf, tooltipNode, d) ->
      left = d3.event.pageX+d.config.stroke.width
      top = d3.event.pageY+d.config.stroke.width
      if conf.tooltip.alwaysInside
        if d3.event.pageX > conf.canvas.width/2.0
          widthTooltip = parseFloat(
            tooltipNode.style('width').replace("px", ''))
          left = d3.event.pageX-d.config.stroke.width-
            widthTooltip-10
        if d3.event.pageY > conf.canvas.height/2.0
          heightTooltip = parseFloat(
            tooltipNode.style('height').replace("px", ''))
          top = d3.event.pageY-d.config.stroke.width-
            heightTooltip-10
      tooltipNode
        .style("left", left+'px')
        .style("top", top+'px')
        .transition().duration(200).style("opacity", 0.9)

    hide: (tooltipNode) ->
      tooltipNode.transition()
        .duration(500).style("opacity", 0)

    callbacks:
      single:
        (params) ->
          serieName = params.circleNode.parentNode.getAttribute("title")
          swatchColor = params.circleNode.getAttribute("stroke")
          "<div>#{serieName}"+
            "<div class='swatch'
              style='background-color: #{swatchColor}'></div>"+
          "</div>"+
          "<div>#{params.data.x} #{params.data.y.toFixed(2)}</div>"
      multipleVertical:
        (params) ->
          # Get all same cx value
          _circleNode = params.circleNode
          cx = _circleNode.getAttribute('cx')
          x = _circleNode.dataset.x
          html = "x=#{x}"
          $(params.canvas[0]).find("circle[cx='#{cx}']").each((e, node)->
            serieName = node.parentNode.getAttribute("title")
            swatchColor = node.getAttribute("stroke")
            y = parseFloat(node.dataset.y).toFixed(2)
            html += "<div>#{serieName} : #{y}"+
              "<div class='swatch'
                style='background-color: #{swatchColor}'></div>"+
            "</div>"
          )
          html

