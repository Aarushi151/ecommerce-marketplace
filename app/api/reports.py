from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/sales")
def get_sales_report(user_id: int, db: Session = Depends(get_db)):

    user = db.execute(
        text("SELECT * FROM users WHERE id = :user_id"),
        {"user_id": user_id}
    ).mappings().first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Role check (admin only)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin can view reports")

    result = db.execute(
        text("SELECT * FROM sales_report ORDER BY created_at DESC")
    ).mappings().all()

    #handle empty result
    if not result:
        return {"message": "No sales data available", "data": []}

    return {
        "count": len(result),
        "data": result
    }


@router.get("/top-products")
def get_top_products(db: Session = Depends(get_db)):

    result = db.execute(
        text("SELECT * FROM top_selling_products WHERE rank_position <= 10")
    ).mappings().all()

    return {
        "count": len(result),
        "data": result
    }