package com.group9.leipajono.Service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Contents;
import com.group9.leipajono.repositories.ContentsRepository;

import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContentsService {
    
    @Autowired
    ContentsRepository myContentsRepository;

    // @PostConstruct
    // public void init(){
    //     myContentsRepository.findById(5L).orElse(null);

    //     if(c != null){
    //         System.out.println("Contents ingredients: " + c.ingredients);

    //     } else {
    //         System.out.println("**************************contents null");
    //     }
    // }

    public List<Contents> getContents(){
        return myContentsRepository.findAll();
    }
}
