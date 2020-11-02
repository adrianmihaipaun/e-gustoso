$(document).ready(function () {
    // burger menu
    $('.burger-menu').on('click', function(){
        $('.module--nav').toggleClass('js--active');
    });

    $('.has-children').on('click', function(){
        $(this).toggleClass('js--active-dropdown');
    });
    
    $('.social-ellipsis').on('click', function(){
        $('nav').toggleClass('js--open-social');
    });

    // scroll nav
    scrollControll();
    $(document).scroll(function(){
        scrollControll();
    });

    // pop-up calendar
    $( "#datepicker" ).datepicker({
        showOn: "both",
        defaultDate: 0,
        buttonImage: "design/icon-calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date"
    });
    $("#datepicker").datepicker("setDate", new Date());

    // products home
    if ($('.module-fetured').length) {
        if (typeof productsElement == 'undefined') {
            $('.module-featured_container').html('<div class="col-12 text-left featured_container-content">Momentan nu avem oferte disponibile!</div>')
        } else {
            var featuredProducts = customFind(productsElement, 'tag', 'Featured');
            $.each(featuredProducts, function(index, product){
                $('.module-featured_container').append(structureProductsHtml(product));
            });
        }
    }
});

// function
function scrollControll() {
    if(window.pageYOffset > 0){
        $('body').addClass('js--scroll');
        $('.module--nav').removeClass('js--active');
    } else {
        $('body').removeClass('js--scroll');
    }
}

// Products
function structureProductsHtml(product) {
    var structureHtml = '<div class="products-container col-12 col-md-4">'+
                            '<img src="'+ generateImgUrl(product.img) +'" alt="'+ product.name +'">'+
                           ' <a href="'+ generateProductsPageUrl(product.productsPagesUrl) +'" class="button">Order now</a>'+
                            '<h4 class="products-title">'+
                                '<a href="'+ generateProductsPageUrl(product.productsPagesUrl) +'">'+ product.name +'</a>'+
                            '</h4>'+
                            '<p class="product-price">'+ getPrice(product) +'</p>'+
                        '</div>';
    return structureHtml;
}

function customFind(object, key, value) {
    var findedValue = [];
    $.each(object, function(index, item){
        if (typeof item[key] != 'undefined' && item[key].toLowerCase() == value.toLowerCase()) {
            findedValue.push(item);
        }
    });

    return findedValue;
}

function generateImgUrl(imgUrl) {
    var url = document.location.href;
    url = url.split('gustoso/');
    url = url[0]
    
    return url + 'gustoso/design/' + imgUrl;
}

function generateProductsPageUrl(productsUrl) {
    var url = document.location.href;
    url = url.split('gustoso/');
    url = url[0]

    return url + 'gustoso/' + productsUrl;
}

const CURRENCY = 'Lei';

function getPrice(product) {
    var price = product.pret + ' ' + CURRENCY;
    if (typeof product.sales != 'undefined' && product.sales.length > 0) {
        return '<span class="custom-price">'+ price +'</span>' + ' ' + '<span class="product-sales">'+ product.sales + ' ' + CURRENCY +'</span>' + '<span class="product-sales_label">Promo</span>';
    } else {
        return price;
    }
}