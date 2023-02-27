const priceCalculation = function (priceList, itemList) {
  let sum = 0;
  itemList.forEach((item) => {
    priceList.forEach((price) => {
      if (item.id === price.id) {
        sum += item.quantity * price.price;
      }
    });
  });
  return Number(sum.toFixed(2));
};

describe('Testing price calculation', () => {
  test('Should return 10.00', () => {
    const priceList = [
      {
        id: 1,
        price: 10
      }
    ];
    const itemList = [
      {
        id: 1,
        quantity: 1
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(10.00);
  });

  test('Should return 177.79', () => {
    const priceList = [
      {
        id: 1,
        price: 10.22
      },
      {
        id: 2,
        price: 122
      },
      {
        id: 3,
        price: 35.99
      },
      {
        id: 4,
        price: 9.58
      }
    ];
    const itemList = [
      {
        id: 1,
        quantity: 1
      },
      {
        id: 2,
        quantity: 1
      },
      {
        id: 3,
        quantity: 1
      },
      {
        id: 4,
        quantity: 1
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(177.79);
  });

  test('Should return 410.75', () => {
    const priceList = [
      {
        id: 1,
        price: 10.29
      },
      {
        id: 2,
        price: 12.49
      }
    ];
    const itemList = [
      {
        id: 1,
        quantity: 12
      },
      {
        id: 2,
        quantity: 23
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(410.75);
  });

  test('Should return 156353.08', () => {
    const priceList = [
      {
        id: 1,
        price: 10.22
      },
      {
        id: 2,
        price: 122
      },
      {
        id: 3,
        price: 35.99
      },
      {
        id: 4,
        price: 9.58
      }
    ];
    const itemList = [
      {
        id: 1,
        quantity: 391
      },
      {
        id: 2,
        quantity: 200
      },
      {
        id: 3,
        quantity: 2312
      },
      {
        id: 4,
        quantity: 4671
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(156353.08);
  });

  test('Should return 0 when itemList is empty', () => {
    const priceList = [
      {
        id: 1,
        price: 10.29
      },
      {
        id: 2,
        price: 12.49
      }
    ];
    const itemList = [];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(0);
  });

  test('Should return 0 when priceList is empty', () => {
    const priceList = [];
    const itemList = [
      {
        id: 1,
        quantity: 12
      },
      {
        id: 2,
        quantity: 23
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(0);
  });
  test('Should return 0 when priceList and itemList are empty', () => {
    const priceList = [];
    const itemList = [];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(0);
  });

  test('Should return 10.00 if price is a string', () => {
    const priceList = [
      {
        id: 1,
        price: '10'
      }
    ];
    const itemList = [
      {
        id: 1,
        quantity: 1
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(10.00);
  });

  test('Should return 10.00 if quantity is a string', () => {
    const priceList = [
      {
        id: 1,
        price: 10
      }
    ];
    const itemList = [
      {
        id: 1,
        quantity: '1'
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(10.00);
  });

  test('Should return 10.00 if quantity and price are a string', () => {
    const priceList = [
      {
        id: 1,
        price: '10'
      }
    ];
    const itemList = [
      {
        id: 1,
        quantity: '1'
      }
    ];
    const result = priceCalculation(priceList, itemList);
    expect(result).toEqual(10.00);
  });
});
