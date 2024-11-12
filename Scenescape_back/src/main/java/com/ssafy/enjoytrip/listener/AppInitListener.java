package com.ssafy.enjoytrip.listener;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;

public class AppInitListener implements ServletContextListener {
	public void contextInitialized(ServletContextEvent sce) {
		ServletContext application = sce.getServletContext();
	
		application.setAttribute("root", application.getContextPath());
	}

	public void contextDestroyed(ServletContextEvent sce) {
		
	}
}
