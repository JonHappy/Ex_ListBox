package com;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Администратор
 */
@WebServlet(name = "Listboxx", urlPatterns = {"/Listboxx"})
public class Listboxx extends HttpServlet {

    protected static final String BASE = "jdbc:mysql://localhost:3306/tan?characterEncoding=UTF8&useUnicode=true";
    protected static final String BASE_PASSWORD = "1234";
    protected static final String BASE_LOGIN = "root";
    protected static final String CLASS_FORNAME = "com.mysql.jdbc.Driver";

    @Override
    public void init() throws ServletException {
        super.init();
        try {
            Class.forName(CLASS_FORNAME).newInstance();
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
            Logger.getLogger(Listboxx.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ResultSet rs;
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String[] s = request.getParameter("name").split("_");
        String[] st = request.getParameter("value").split(" ");
        StringBuilder sy = new StringBuilder();
        for (String sf : st) {
            sy.append(" name like '%").append(sf).append("%' and");
        }
        sy.setLength(sy.length() - 4);
        StringBuilder sbb = new StringBuilder();
        try (Connection con = DriverManager.getConnection(BASE, BASE_LOGIN, BASE_PASSWORD);
                Statement stmt = con.createStatement();) {
            rs = stmt.executeQuery("SELECT goods.id, goods.name FROM goods WHERE " + sy.toString() + " limit 15");

            sbb.append(String.format("%1$S.%2$S|", s[1], s[2]));
            if (rs != null) {
                sbb.append(list_names(rs).toString());
            }
            out.print(sbb.toString());
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    private StringBuilder list_names(ResultSet rs) {
        StringBuilder sbb = new StringBuilder();
        try {
            sbb.append("<table id='xxx'>");
            int n = 0;
            while (rs.next()) {
                sbb.append(String.format("<tr class='tr'><td  data-fn='%1$S' data-id='%2$S'>%3$S</td></tr> ",
                        ++n, rs.getString("id"), rs.getString("name")));
            }
            sbb.append("</table>");
            if (n == 0) {
                sbb.setLength(0);
                sbb.append(" ");
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return sbb;
    }
}
