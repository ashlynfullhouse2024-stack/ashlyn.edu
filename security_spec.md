# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Default Deny**: All paths not explicitly matched in `/databases/{database}/documents` are denied for both `read` and `write`.
2. **Verified Authentication & Admin Identity**:
   - All authenticated writes require `request.auth != null && request.auth.token.email_verified == true`.
   - Admin access (`isAdmin()`) requires `isSignedIn()` and either `exists(/databases/$(database)/documents/admins/$(request.auth.uid))` or verified runtime owner email (`request.auth.token.email == 'anpurwa001@gmail.com' && request.auth.token.email_verified == true`).
3. **Order Isolation (`/orders/{orderId}`)**:
   - Contains customer PII (`customerName`, `customerPhone`, `customerEmail`) and PKKM credentials (`licenseUsername`, `licensePassword`).
   - `get` and `list` are strictly restricted to the order's `ownerId` (`resource.data.ownerId == request.auth.uid`) or `isAdmin()`.
   - `create` requires `incoming().ownerId == request.auth.uid`, valid ID format (`isValidId(orderId)`), server timestamps (`createdAt == request.time && updatedAt == request.time`), and strict schema/size checks (`isValidOrder(incoming())`).
   - Non-admin users cannot inject `licenseUsername` or `licensePassword` during creation (credentials are only populated by Admin upon payment confirmation).
4. **PKKM License Vault Isolation (`/pkkmLicenses/{licenseId}`)**:
   - Contains the 10 sensitive PKKM usernames and passwords (`madrasah_juara01` .. `madrasah_teladan10`).
   - Strictly accessible (`get`, `list`, `create`, `update`, `delete`) ONLY to `isAdmin()`.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Order Read**: Anonymous user attempts `get /orders/ASH-261105-ABCD` -> `PERMISSION_DENIED`.
2. **Cross-User PII Leak**: User B (`uid_b`) attempts `get /orders/ASH-261105-ABCD` owned by User A (`ownerId: 'uid_a'`) -> `PERMISSION_DENIED`.
3. **Blanket Order List Scraping**: Authenticated non-admin user queries `list /orders` without `where('ownerId', '==', uid)` -> `PERMISSION_DENIED`.
4. **Identity Spoofing on Create**: User A attempts `create /orders/ASH-1` with `ownerId: 'uid_victim'` -> `PERMISSION_DENIED`.
5. **Shadow Field Injection on Create**: User A attempts `create /orders/ASH-1` with extra field `isAdminApproved: true` -> `PERMISSION_DENIED`.
6. **Pre-Payment Credential Self-Assignment**: Non-admin user attempts `create /orders/ASH-1` with non-empty `licenseUsername: 'madrasah_juara01'` -> `PERMISSION_DENIED`.
7. **Timestamp Forgery on Create**: User A attempts `create /orders/ASH-1` with past/future `createdAt` != `request.time` -> `PERMISSION_DENIED`.
8. **Immutable Field Mutation on Update**: User attempts `update /orders/ASH-1` modifying `ownerId` or `createdAt` -> `PERMISSION_DENIED`.
9. **ID Poisoning Attack**: User attempts `create /orders/invalid$id!with*spaces` -> `PERMISSION_DENIED`.
10. **Value Poisoning / Oversized Payload**: User attempts `create /orders/ASH-1` with `customerName` > 120 chars or `itemsJson` > 15 elements -> `PERMISSION_DENIED`.
11. **Unverified Email Admin Spoof**: Attacker with `email: 'anpurwa001@gmail.com'` and `email_verified: false` attempts `get /pkkmLicenses/PKKM-01` -> `PERMISSION_DENIED`.
12. **Unauthorized License Vault Read**: Verified non-admin user attempts `get` or `list` on `/pkkmLicenses` -> `PERMISSION_DENIED`.
