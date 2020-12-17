package backendecomm.demo.controllers;

import backendecomm.demo.dao.ProductRepository;
import backendecomm.demo.entities.Product;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
@CrossOrigin("*")
@RestController
public class ProductController {
    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //ajouter a chaque product une photo
    @GetMapping(path = "/photoProduct/{id}",produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getPhoto(@PathVariable("id") Long id) throws Exception{
        Product p=productRepository.findById(id).get();
        return Files.readAllBytes(Paths.get(System.getProperty("user.home")+"/images/products/"+p.getImageUrl()));
    }
    //modifer un photo du product et envoyer a la base de donnes
    @PostMapping(path="/uploadPhoto/{id}")
    public void uploadPhoto(MultipartFile file, @PathVariable Long id) throws Exception{
        Product p=productRepository.findById(id).get();
        p.setImageUrl(file.getOriginalFilename());
        Files.write(Paths.get(System.getProperty("user.home")+"/images/products/"+p.getImageUrl()),file.getBytes());
        //upload dans la base de donnees
        productRepository.save(p);
    }
}
