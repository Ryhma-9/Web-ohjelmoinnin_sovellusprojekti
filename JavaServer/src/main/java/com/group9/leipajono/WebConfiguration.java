<<<<<<< HEAD
package com.group9.leipajono;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}")
            .setViewName("forward:/");
        registry.addViewController("/*/{spring:\\w+}")
            .setViewName("forward:/");
        //registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
        //    .setViewName("forward:/");
    }
}
=======
package com.group9.leipajono;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}")
            .setViewName("forward:/");
        registry.addViewController("/*/{spring:\\w+}")
            .setViewName("forward:/");
        //registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
        //    .setViewName("forward:/");
    }
}
>>>>>>> ed35d5cf03e2038fedbb863eea0024ab74173e13
