from app.core.database import SessionLocal
from app.models.models import User, Product, Category, Order, OrderItem, Review, UserRole
from datetime import datetime

db = SessionLocal()


def seed():


    # 👤 USERS
    users = [
        User(
            id=1,
            name="Admin",
            email="admin@test.com",
            password_hash="hashedpassword",
            role=UserRole.admin
        ),
        User(
            id=2,
            name="John",
            email="john@test.com",
            password_hash="hashedpassword",
            role=UserRole.user
        ),
        User(
            id=3,
            name="Alice",
            email="alice@test.com",
            password_hash="hashedpassword",
            role=UserRole.user
        ),
    ]
    db.add_all(users)

    # 📂 CATEGORIES
    categories = [
        Category(id=1, name="Electronics"),
        Category(id=2, name="Clothing"),
    ]
    db.add_all(categories)

    # 📦 PRODUCTS
    products = [
        Product(
            id=1,
            name="iPhone",
            price=800,
            stock_qty=10,
            category_id=1,
            seller_id=1,
            created_at=datetime.utcnow()
        ),
        Product(
            id=2,
            name="Laptop",
            price=1200,
            stock_qty=5,
            category_id=1,
            seller_id=1,
            created_at=datetime.utcnow()
        ),
        Product(
            id=3,
            name="T-Shirt",
            price=20,
            stock_qty=50,
            category_id=2,
            seller_id=1,
            created_at=datetime.utcnow()
        ),
        Product(
            id=4,
            name="Jeans",
            price=40,
            stock_qty=30,
            category_id=2,
            seller_id=1,
            created_at=datetime.utcnow()
        ),
    ]
    db.add_all(products)

    # 🧾 ORDERS
    orders = [
        Order(id=1, user_id=2, total_amount=820),
        Order(id=2, user_id=3, total_amount=1200),
    ]
    db.add_all(orders)

    # 🛒 ORDER ITEMS
    order_items = [
        OrderItem(order_id=1, product_id=1, quantity=1, price=800),
        OrderItem(order_id=1, product_id=3, quantity=1, price=20),
        OrderItem(order_id=2, product_id=2, quantity=1, price=1200),
    ]
    db.add_all(order_items)

    # ⭐ REVIEWS
    reviews = [
        Review(user_id=2, product_id=1, rating=5, comment="Great product"),
        Review(user_id=3, product_id=2, rating=4, comment="Good laptop"),
    ]
    db.add_all(reviews)

    db.commit()
    print("✅ Seed data inserted successfully!")


if __name__ == "__main__":
    seed()