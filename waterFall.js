
(function($){

  $.fn.waterFall = function(options){

      var defaults = {
          gap: 20
      }

      defaults = $.extend(defaults,options);

      var _this = $(this),
          //获取调用者的所有子元素
          items = _this.children(),
          // 调用者items的宽度
          width = items.width(),
          // 初始化高
          height = 0,
          // 间距
          gap = defaults.gap,
          // 计算总共有几列 （向下取整，一行能装几个）
          count = Math.floor(_this.width()/(width + gap)),
          // 记录每一列的高
          colums = [];
          // console.log(_this.width());
          // // item图片加上内边距的宽度
          // console.log(width);
          // console.log(items);
          // console.log(count);

          // 遍历所有子元素
          items.each(function(key,val){
            // 获取每个元素高
            height = $(val).height();
            // console.log(height);
            // 这表示第一行
            if(key < count){
              // 初始化列高
              colums[key] = height;
              // console.log(colums);
              $(val).css({
                top: 0,
                left: (width + gap) * key
              });
            }else { //其他行

              var min_val = colums[0];
              var min_key = 0;
              // 去上一列的最小值
              for(var i=0;i<colums.length;i++){
                if(colums[i]<min_val){
                  min_val = colums[i];
                  min_key = i;
                }
              }
              // 更新最小列
              colums[min_key] += height;
              // console.log(height);
              // console.log(colums);
              $(val).css({
                top: min_val + gap,
                left: (width + gap) * min_key
              });
            }
            
          });

          // 取最大值
          var max_val = colums[0];
          for(var j=0;j<colums.length;j++){
              if(colums[j] > max_val){
                max_val = colums[j];
              }
          }

          // 设置父元素的高   (为了【正在加载】元素不被覆盖住)
          _this.height(max_val);
        
}

})(jQuery)
