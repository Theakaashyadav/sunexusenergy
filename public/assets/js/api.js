async function apiRequest(action, data = {}) {
  const payload = encodeURIComponent(JSON.stringify({ action, ...data }));
  const url = `${API_URL}?payload=${payload}`;
  const res = await fetch(url);
  return await res.json();
}

async function getProducts() {
  try {
    const res = await apiRequest('getProducts');
    return res.products || [];
  } catch (e) {
    return demoProducts();
  }
}

function demoProducts() {
  return [
    {product_id:'P001',product_name:'Premium Smart Watch',category:'Electronics',price:2499,discount_price:1999,short_description:'Stylish fitness watch with smart features.',description:'A premium smartwatch with health tracking, notifications and long battery life.',image_url:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',stock_status:'In Stock',status:'Active'},
    {product_id:'P002',product_name:'Wireless Headphones',category:'Audio',price:3499,discount_price:2799,short_description:'Noise-free wireless sound experience.',description:'Comfortable wireless headphones with deep bass and clear audio.',image_url:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',stock_status:'In Stock',status:'Active'},
    {product_id:'P003',product_name:'Modern Chair',category:'Furniture',price:4999,discount_price:4299,short_description:'Elegant chair for home and office.',description:'A premium ergonomic chair designed for comfort and modern interiors.',image_url:'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80',stock_status:'In Stock',status:'Active'}
  ];
}
