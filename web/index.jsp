<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="CSS/listbox.css" rel="stylesheet" type="text/css"/>
        <link href="CSS/page.css" rel="stylesheet" type="text/css"/>
        <script src="js/jquery/external/jquery/jquery.js" type="text/javascript"></script>
        <script src="js/listbox_v1.js" type="text/javascript"></script>


        <style>
            #lb{
                height: 20px;
                width: 400px;
                position: absolute;
                top: 60px;
                left: 400px;
                background: #ccc;
            }
            #lbr{
                height: 20px;
                width: 400px;
                position: absolute;
                top: 60px;
                left: 900px;
                background: #ccc;
            }
        </style>
    </head>
    <body>
        <div id="tt" class="ff"></div>
        <div id="twt" class="ff"></div>

    <my-listbox id="lb"   data-handler_callback="yyy32" data-placeholder="поиск" set='{"n_row":5}'></my-listbox>

    <my-listbox id="lbr"   data-handler_callback="yyy32" data-placeholder="поиск" set='{"n_row":13}'></my-listbox>

    <script>
        function yyy32(p) {
            console.log(p);

        }
        document.getElementById('tt').addEventListener("xxxxx5", function (event) {
//            console.log(event.detail.v);
            $('#tt').html(event.detail.v);
            console.log('9999999999999999');
        });

    </script>

</body>
</html>
