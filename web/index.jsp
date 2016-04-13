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
        </style>
    </head>
    <body>

    <my-listbox id="lb"   data-handler_callback="yyy32" data-placeholder="поиск" set="{ss:88}"></my-listbox>

    <script>

        function yyy32(p) {
            console.log(p);
        }
    </script>

</body>
</html>
