window.Core = {
  /**
   * 弹出提示框
   * @param  {string} typ 消息类型：success, info, warning, danger
   * @param  {string} msg 消息内容
   * @param  {object} position 位置 top-center  top-left  top-right
   */
  alert: (typ, msg, position = 'top-center') => {
    let delay = 3000
    let top = 10
    let box = $('<div class="alert alert-' + typ + ' alert-dismissible alert-' + position + '" role="alert" ><button type="button" class="close" data-dismiss="alert"></button>' + msg + '</div>')
    $('body').append(box)
    box.animate({top: top}, () => {
      setTimeout(() => {
        box.remove()
      }, delay)
    })
  }
}
