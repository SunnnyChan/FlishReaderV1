<template>
    <div class="not-found parallax">
        <div>
            <img id = "logo" alt="logo" src="@assets/logo.png"/>
        </div>
        <div id="wave-message">
            <p>Your're lost</p>
            <p><span>Click to return!</span></p>
            <br>
            <p id="retrun-back"><span><a href="/"> ««« </a></span></p>
        </div>
    </div>
</template>

<script>
  /** 
   * 404错误页面 
   * created 20200701 by sunnnychan@gmail.com
  */
</script>

<style scoped>

#logo {
position:absolute;
left:  30%;
top: 50px;
}

#wave-message {
position:fixed; *position:absolute; width:500px; height:400px; top:40%; left:40%; margin:-50px 0 0 -50px;
color:#008B8B;
font-size: 40px;
margin:0 auto;
}

#retrun-back span {
font-weight:bold;
font-size: 50px;

}

a:visited{color:#00BFFF;}

</style>
