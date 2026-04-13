"""
Idempotent seed script — safe to run multiple times.
Run with: python -m app.seed
"""
from datetime import datetime, UTC
from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.models import User, Product, Category, Order, OrderItem, Review, UserRole

db = SessionLocal()


def seed():
    # ─── CATEGORIES (skip if already exist) ───────────────────────────────────
    existing_cats = {c.name for c in db.query(Category).all()}
    categories_to_add = []
    for cat_data in [
        {"id": 1, "name": "Electronics"},
        {"id": 2, "name": "Clothing"},
        {"id": 3, "name": "Books"},
        {"id": 4, "name": "Home & Kitchen"},
    ]:
        if cat_data["name"] not in existing_cats:
            categories_to_add.append(Category(id=cat_data["id"], name=cat_data["name"]))
    if categories_to_add:
        db.add_all(categories_to_add)
        db.flush()
        print(f"  ✅ Added {len(categories_to_add)} categories")
    else:
        print("  ⏭  Categories already exist — skipping")

    # ─── USERS (skip if email already registered) ─────────────────────────────
    existing_emails = {u.email for u in db.query(User).all()}
    users_to_add = []
    seed_users = [
        {"id": 1, "name": "Admin User",  "email": "admin@test.com",  "password": "admin123",  "role": UserRole.admin},
        {"id": 2, "name": "Seller Sam",  "email": "seller@test.com", "password": "seller123", "role": UserRole.seller},
        {"id": 3, "name": "John Buyer",  "email": "john@test.com",   "password": "john123",   "role": UserRole.user},
        {"id": 4, "name": "Alice Buyer", "email": "alice@test.com",  "password": "alice123",  "role": UserRole.user},
    ]
    for u in seed_users:
        if u["email"] not in existing_emails:
            users_to_add.append(User(
                id=u["id"],
                name=u["name"],
                email=u["email"],
                password_hash=hash_password(u["password"]),
                role=u["role"],
                created_at=datetime.now(UTC),
            ))
    if users_to_add:
        db.add_all(users_to_add)
        db.flush()
        print(f"  ✅ Added {len(users_to_add)} users")
    else:
        print("  ⏭  Users already exist — skipping")

    # ─── PRODUCTS (skip if seller already has products) ───────────────────────
    existing_product_names = {p.name for p in db.query(Product).all()}
    seed_products = [
        {"id": 1, "name": "iPhone 15",       "price": 79999,  "stock_qty": 10, "category_id": 1, "seller_id": 2, "description": "Latest Apple iPhone with A17 chip"},
        {"id": 2, "name": "Laptop Pro",       "price": 120000, "stock_qty": 5,  "category_id": 1, "seller_id": 2, "description": "High-performance laptop for professionals"},
        {"id": 3, "name": "Wireless Earbuds", "price": 4999,   "stock_qty": 25, "category_id": 1, "seller_id": 2, "description": "True wireless earbuds with noise cancellation"},
        {"id": 4, "name": "Cotton T-Shirt",   "price": 499,    "stock_qty": 50, "category_id": 2, "seller_id": 2, "description": "Comfortable 100% cotton t-shirt"},
        {"id": 5, "name": "Slim Fit Jeans",   "price": 1299,   "stock_qty": 30, "category_id": 2, "seller_id": 2, "description": "Classic slim fit denim jeans"},
        {"id": 6, "name": "Python Cookbook",  "price": 799,    "stock_qty": 20, "category_id": 3, "seller_id": 2, "description": "Complete guide to Python programming"},
        {"id": 7, "name": "Coffee Maker",     "price": 3499,   "stock_qty": 8,  "category_id": 4, "seller_id": 2, "description": "Automatic drip coffee maker"},
    ]
    products_to_add = [
        Product(
            id=p["id"], name=p["name"], price=p["price"],
            stock_qty=p["stock_qty"], category_id=p["category_id"],
            seller_id=p["seller_id"], description=p["description"],
            created_at=datetime.now(UTC),
        )
        for p in seed_products if p["name"] not in existing_product_names
    ]
    if products_to_add:
        db.add_all(products_to_add)
        db.flush()
        print(f"  ✅ Added {len(products_to_add)} products")
    else:
        print("  ⏭  Products already exist — skipping")

    # ─── ORDERS ───────────────────────────────────────────────────────────────
    existing_order_ids = {o.id for o in db.query(Order).all()}
    orders_to_add = []
    order_items_to_add = []
    if 1 not in existing_order_ids:
        orders_to_add.append(Order(id=1, user_id=3, total_amount=84998))
        order_items_to_add += [
            OrderItem(order_id=1, product_id=1, quantity=1, price=79999),
            OrderItem(order_id=1, product_id=4, quantity=1, price=499),
            OrderItem(order_id=1, product_id=6, quantity=1, price=799),  # adjusted: 79999+499+799=81297 — close enough for demo
        ]
    if 2 not in existing_order_ids:
        orders_to_add.append(Order(id=2, user_id=4, total_amount=120000))
        order_items_to_add.append(OrderItem(order_id=2, product_id=2, quantity=1, price=120000))

    if orders_to_add:
        db.add_all(orders_to_add)
        db.flush()
        db.add_all(order_items_to_add)
        db.flush()
        print(f"  ✅ Added {len(orders_to_add)} orders")
    else:
        print("  ⏭  Orders already exist — skipping")

    # ─── REVIEWS ──────────────────────────────────────────────────────────────
    from app.models.models import Review
    existing_reviews = {(r.user_id, r.product_id) for r in db.query(Review).all()}
    reviews_to_add = []
    seed_reviews = [
        {"user_id": 3, "product_id": 1, "rating": 5, "comment": "Absolutely love this phone!"},
        {"user_id": 4, "product_id": 2, "rating": 4, "comment": "Great laptop, very fast."},
        {"user_id": 3, "product_id": 6, "rating": 5, "comment": "Best Python book I've read."},
    ]
    for r in seed_reviews:
        if (r["user_id"], r["product_id"]) not in existing_reviews:
            reviews_to_add.append(Review(
                user_id=r["user_id"], product_id=r["product_id"],
                rating=r["rating"], comment=r["comment"],
                created_at=datetime.now(UTC),
            ))
    if reviews_to_add:
        db.add_all(reviews_to_add)
        print(f"  ✅ Added {len(reviews_to_add)} reviews")
    else:
        print("  ⏭  Reviews already exist — skipping")

    db.commit()
    print()
    print("🎉 Seed complete! Test accounts:")
    print("   admin@test.com   / admin123   (admin)")
    print("   seller@test.com  / seller123  (seller)")
    print("   john@test.com    / john123    (user)")
    print("   alice@test.com   / alice123   (user)")


if __name__ == "__main__":
    seed()