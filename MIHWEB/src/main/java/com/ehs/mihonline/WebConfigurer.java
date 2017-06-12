package com.ehs.mihonline;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Component
class WebConfigurer extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // registry.addResourceHandler("/captcha/**").addResourceLocations("file:///usr/syam/captcha");
    	registry.addResourceHandler("/pdffiles/**").addResourceLocations("file:O:\\MIH\\Process\\");
    	System.out.println("<><><><>Added resource handler ");
    }

}
