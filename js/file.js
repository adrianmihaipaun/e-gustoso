$(document).ready(function () {
    // burger menu
    $('.burger-menu').on('click', function(){
        $('.module--nav').toggleClass('js--active');
        $('.module-info').removeClass('js--active-alert');
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

    // current year
    document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
});

// function
function scrollControll() {
    if(window.pageYOffset > 0){
        $('body').addClass('js--scroll');
        $('.module--nav').removeClass('js--active');
        $('.module-info').removeClass('js--active-alert');
    } else {
        $('body').removeClass('js--scroll');
        $('.module-info').addClass('js--active-alert');
    }
}

// Products
function structureProductsHtml(product) {
    var structureHtml = '<div class="products-container col-12 col-lg-4 col-md-6">'+
                            '<div class="products-container--content">'+
                                '<img src="'+ generateImgUrl(product.img) +'" alt="'+ product.name +'">'+
                                ' <a href="'+ generateProductsPageUrl(product.productsPagesUrl) +'" class="button">Order now</a>'+
                                '<h4 class="products-title">'+
                                    '<a href="'+ generateProductsPageUrl(product.productsPagesUrl) +'">'+ product.name +'</a>'+
                                '</h4>'+
                                '<p class="product-price">'+ getPrice(product) +'</p>'+
                            '</div>'+
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
    url = url.split('.com');
    url = url[0]
    
    return url + '.com/design/' + imgUrl;
}

function generateProductsPageUrl(productsUrl) {
    var url = document.location.href;
    url = url.split('.com');
    url = url[0]

    return url + '.com/' + productsUrl;
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