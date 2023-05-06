SELECT p.product_sku, p.sub_category_id, p.shipment_id, p.chargerback_id, p.status_id, dt.detail_name, pd.detail_value
FROM product p, detail_type dt, product_detail pd
WHERE p.product_sku = pd.product_sku
AND pd.detail_id = dt.detail_id
AND p.product_sku = 'ABU123'
ORDER BY p.product_sku ASC;