<!-- item template -->
<script type='text/javascript' src='lib/vue.min.js'></script>
<script type="text/x-template" id="item-template">
  <li v-if="isFolder" class="directory">
    <div
      @click="toggle"
      @dblclick="changeType">
      {{model.name}}
    </div>
    <ul v-show="open" v-if="isFolder">
      <item 
        class="directory"
        v-for="model in model.children"
        :model="model">
      </item>
    </ul>
  </li>
  <li v-else class="file">
  	<div>
      {{model.name}}
    </div>
  </li>
</script>
<!-- the demo root element -->
<div class="directoryStructure">
  <ul>
    <item
      class="directory"
      :model="treeData">
    </item>
  </ul>
</div>
 
 
<script type="text/javascript">
// Directory Structure data
var data = {
  name: 'My Tree',
  children: [
    { name: 'test.txt' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: '' }
          ]
        }
      ]
    }
  ]
};
// define the item component
Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: true
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    }
  }
})
// boot up the demo
var directoryStructure = new Vue({
  el: '.directoryStructure',
  data: {
    treeData: data
  }
})
</script>