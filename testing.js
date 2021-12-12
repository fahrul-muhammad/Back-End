// testing PostMan
// server.get("/", (req, res) => {
//   res.redirect("test");
// });

// server.get("/test", (req, res) => {
//   res.status(300).json({
//     pesan: "anda telah berhasil masuk",
//   });
// });

// server.get(
//   "/getdata",
//   (req, res, next) => {
//     let isValid = true;
//     req.customValue = 1;
//     if (isValid) {
//       return next();
//     }
//     res.json({
//       pesan: "nilai tidak valid",
//     });
//   },
//   (req, res) => {
//     const { customValue } = req;
//     res.json({
//       customValue,
//     });
//   }
// );

/* 
SELECT vehicle.id, vehicle.vehicle_name, vehicle_price,vehicle_category.name AS "category" FROM vehicle_rental.vehicle
JOIN vehicle_rental.vehicle_category ON vehicle.vehicle_category = vehicle_category.id;
*/

// server.post("/classes", (req, res) => {
//   const {
//     body: { name, category_id } = req;
//     {
//         name: "",
//         category_id: Number
//     }
// }

const name = Date.now().toString();
console.log(name);
