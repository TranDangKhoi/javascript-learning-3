const person1 = {
  name: "Khoi",
  age: 21,
  address: {
    city: "Hanoi",
    country: "Vietnam",
    zipcode: "100000",
  },
  school: {
    name: "PTIT",
    class: {
      name: "SE1305",
      year: 2025,
      random: {
        nested: "test",
        random2: {
          nested2: "test",
        },
      },
    },
  },
};

// Có 3 cách để clone một object, mỗi cách sẽ có ưu nhược điểm riêng

const person2 = { ...person1 }; // Cách 1: Sử dụng spread operator
person2.school.class.random.random2.nested2 = "changed";
// console.log("person1", person1); // nested2 của person1 cũng bị thay đổi
// console.log("person2", person2); // nested2 của person2 bị thay đổi

// Thực ra nested 1 level thôi thì spread operator cũng sẽ không clone và tạo một dynamic memory allocation mới được

const person3 = {
  name: "Khoi",
  school: {
    name: "PTIT",
  },
};

const person4 = { ...person3 };
person4.school.name = "FPTU";
// console.log("person3", person3); // school.name của person3 cũng bị thay đổi
// console.log("person4", person4); // school.name của person4 bị thay đổi

// TỪ ĐÂY TA SUY RA, SPREAD OPERATOR CHỈ CLONE 1 LEVEL, NẾU CÓ NESTED OBJECT THÌ NÓ SẼ KHÔNG CLONE

// Cách 2: Sử dụng Object.assign
const country1 = {
  name: "Vietnam",
  city: "Hanoi",
  coordinates: {
    lat: 21.0285,
    long: 105.8542,
    randomNested: {
      random: "test",
      random2: {
        nested: "test",
      },
    },
  },
};

const country2 = Object.assign({}, country1); // Clone country1
country2.coordinates.randomNested.random2.nested = "changed";

// console.log("country1", country1); // nested của country1 cũng bị thay đổi
// console.log("country2", country2); // nested của country2 bị thay đổi

// TỪ ĐÂY TA SUY RA, OBJECT.ASSIGN CŨNG CHỈ CLONE 1 LEVEL, NẾU CÓ NESTED OBJECT THÌ NÓ SẼ KHÔNG CLONE

// Cách 3: Sử dụng structuredClone (CÁCH TUYỆT VỜI NHẤT)

const country3 = {
  name: "Vietnam",
  city: "Hanoi",
  coordinates: {
    lat: 21.0285,
    long: 105.8542,
    randomNested: {
      random: "test",
      random2: {
        nested: "test",
      },
    },
  },
};

const country4 = structuredClone(country3); // Clone country3

country4.coordinates.randomNested.random2.nested = "changed";

// console.log("country3", country3); // nested của country3 không bị thay đổi
// console.log("country4", country4); // nested của country4 bị thay đổi

// TỪ ĐÂY TA SUY RA, STRUCTUREDCLONE SẼ CLONE HẾT CẢ NESTED OBJECT

// Cách 4: Sử dụng JSON.parse(JSON.stringify(object))

const school1 = {
  name: "PTIT",
  class: {
    name: "SE1305",
    year: 2025,
    random: {
      nested: "test",
      random2: {
        nested2: "test",
      },
    },
  },
};

const school2 = JSON.parse(JSON.stringify(school1)); // Clone school1
school2.class.random.random2.nested2 = "changed";

console.log("school1", school1); // nested của school1 không bị thay đổi
console.log("school2", school2); // nested của school2 bị thay đổi
