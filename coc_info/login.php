<?php
/**
 * Created by PhpStorm.
 * User: ro200
 * Date: 2/8/2018
 * Time: 3:15 PM
 */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <!-- FONT -->
    <!--<link rel="stylesheet" href="css/font-awesome.min.css">-->

    <!--<link rel="stylesheet" href="css/logIn_.css">-->
    <script src="scripts/logIn.js"></script>

    <!-- less -->
    <link rel="stylesheet/less" type="text/css" href="css/logIn.less" />
    <script src="scripts/less.min.js"></script>


</head>
<body>
<section>

    <div class="formBox">

        <form action="index.php" method="post">
            <div id="clans" class="custom-select"></div>
            <div id="users" class="custom-selectt"></div>
            <div id="pass">
                <input type="hidden"   name="tag_clan" value="" id="tag_clan">
                <input type="password" name="password" value="" id="password" placeholder="Password" autocomplete="off" ></div>
            <div class="submitBut"><input type="submit" value="submit"></div>
        </form>
    </div>

    <script>
        var clans=JSON.parse('<?php echo ($json); ?>');
    </script>

</section>
</body>
</html>