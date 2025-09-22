-- Insert default admin user
INSERT IGNORE INTO users (id, first_name, last_name, email, password, role, created_at, updated_at) 
VALUES (1, 'Admin', 'User', 'admin@hotel.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN', NOW(), NOW());

-- Insert default regular user
INSERT IGNORE INTO users (id, first_name, last_name, email, password, role, created_at, updated_at) 
VALUES (2, 'Regular', 'User', 'user@hotel.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER', NOW(), NOW());

-- Insert sample rooms
INSERT IGNORE INTO rooms (id, name, description, price, image_url, max_guests, available, created_at, updated_at) 
VALUES 
(1, 'Deluxe Ocean View', 'Spacious room with stunning ocean views and premium amenities.', 299.00, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', 2, true, NOW(), NOW()),
(2, 'Executive Suite', 'Luxurious suite perfect for business travelers and special occasions.', 499.00, 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', 4, true, NOW(), NOW()),
(3, 'Standard Room', 'Comfortable and affordable room with all essential amenities.', 149.00, 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg', 2, true, NOW(), NOW());

-- Insert room amenities
INSERT IGNORE INTO room_amenities (room_id, amenity) VALUES
(1, 'Ocean View'),
(1, 'King Bed'),
(1, 'Mini Bar'),
(1, 'WiFi'),
(1, 'Room Service'),
(2, 'Separate Living Area'),
(2, 'King Bed'),
(2, 'Business Desk'),
(2, 'WiFi'),
(2, 'Concierge'),
(3, 'Queen Bed'),
(3, 'WiFi'),
(3, 'Air Conditioning'),
(3, 'TV');