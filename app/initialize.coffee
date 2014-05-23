module.exports = exp = {}

agchart = require 'agchart'
time = require 'utils/time'

exp.run = ->
  # TODO: finish this module if needed (later on)
  t = new time.Main(
    lang: 'en'
  )
  formatTooltip = (d) ->
    date = new Date(d)
    formatDate = d3.time.format("%b '%y")
    formatDate(date)

  # Just for the purpose of the example
  genData = (len, inter=1) ->
    els = []
    for i in [0..len-1] by inter
      els.push {x: new Date(i*1000), y: Math.random()*100}
    els

  agChart = new agchart.Main(
    config:
      canvas:
        render: 'dotline' # dot, line, dotline
        label:
          x:
            text: "Some label X"
            size: 10
            color: "#7f7f7f"
          y:
            text: "Some label Y"
            size: 10
            color: "#7f7f7f"
        selector: '#chart1'
        padding: [30,30]
        cross:
          x:
            show: true
            color: "#44A0FF"
          y:
            show: true
            color: "#FFA044"
      logo:
        url: "agflow-logo.png"
        width: 100
        height: 50
        x: 'right'
        y: 'bottom'
        opacity: 0.3
      tooltip:
        callback: "multipleVerticalInverted" # SinglePoint, multipleVertical
        format:
          x: formatTooltip
      point:
        # SinglePoint, multipleVertical, multipleVerticalInverted
        onMouseover: "multipleVerticalInverted"
        onMouseout: "multipleVerticalInverted"
        r: 3
        color: 'paired' # Color or palette name
        stroke: {width: 1, color: null}
      axis:
        y:
          tickSize: "full"
        x:
          format: "%b"
          tickSize: "full"
    series: [
      {
        name: "Serie 1"
        data: genData(24*3600*120, 24*3600)
        config:
          stroke: {width: 1, color: "#fff"}
      }
      {
        name: "Serie 2"
        data: genData(24*3600*120, 36*3600*2)
        config:
          #color: "#ff0001"
          stroke: {width: 1, "#fff"}
      }
      {
        name: "Serie 3"
        data: genData(24*3600*120, 48*3600)
        config:
          #color: "#00fffe"
          stroke: {width: 1, color: "#fff"}
      }
    ]
  )
  agChart.render()
