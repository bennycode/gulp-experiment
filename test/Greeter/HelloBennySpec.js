describe('GetName', function () {
  it('concatenates the first name with the last name', function () {
    var fistName = 'Benny';
    var lastName = 'Neugebauer';
    var name = GetName(fistName, lastName);
    expect(name).toBe(fistName + ' ' + lastName);
  });
});