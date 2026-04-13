from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base,engine
from sqlalchemy import text
Base.metadata.create_all(bind=engine)
# import ALL models
from app.models import models

# CREATE TABLES
models.Base.metadata.create_all(bind=engine)

# CREATE VIEWS
with engine.connect() as conn:

    # Top Selling Products View
    conn.execute(text("""
    CREATE VIEW IF NOT EXISTS top_selling_products AS
    SELECT 
        p.id AS product_id,
        p.name,
        COUNT(oi.product_id) AS total_sold,
        RANK() OVER (ORDER BY COUNT(oi.product_id) DESC) as rank_position
    FROM products p
    JOIN order_items oi ON p.id = oi.product_id
    GROUP BY p.id;
    """))

    # Sales Report View
    conn.execute(text("""
    CREATE VIEW IF NOT EXISTS sales_report AS
    SELECT
        o.id AS order_id,
        o.user_id,
        SUM(oi.quantity * oi.price) AS total_amount,
        COUNT(oi.product_id) AS total_items,
        o.created_at
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC;
    """))

    conn.commit()


#routes
from app.api import (
    alerts,
    auth,
    cart,
    categories,
    invoices,
    orders,
    products,
    search, 
    reviews, 
    recommendations, 
    reports
)


app = FastAPI(title="Ecommerce Marketplace API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(cart.router, prefix="/cart", tags=["Cart"])
app.include_router(orders.router, prefix="/orders", tags=["Orders"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(invoices.router, prefix="/invoices", tags=["Invoices"])
app.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
app.include_router(search.router, prefix="/search", tags=["Search"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
app.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])


@app.get("/")
def root():
    return {"message": "Marketplace API running 🚀"}