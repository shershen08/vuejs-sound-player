## Vue.js sound player

### Demo

See [DEMO](https://shershen08.github.io/vue-plugins-demo-static/index.html#/sound) here

### Installation

Use npm: ```npm install vue-audio --save```

Or bower: ```bower install vue-audio```

### Usage

Add in the component ```import VueAudio from 'vue-audio';```

Use in the template ```<vue-audio file="myLocalFile"></vue-audio>```

The component has two attributes

 - **file** (String) is required;
 - **autoPlay** (Boolean) is false by default;
 
 
 For styling the Bootstrap classes v 3.7 are used, so you may want to add [bootstrap css](https://www.npmjs.com/package/bootstrap-css) package or add via stylesheet link ```<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">```

### ToDo

 - <s>Add track position navigation</s>
 - Add remote file load service

### License

MIT
